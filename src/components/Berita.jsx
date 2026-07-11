import { useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { newsData } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

const BeritaCard = memo(({ item, index }) => {
  return (
    <article className={`berita__card berita__card--${index}`} style={{ '--i': index }}>
      <div className="berita__card-img-wrap">
        <img src={item.image} alt={item.title} className="berita__card-img" loading="lazy" decoding="async" />
        <span className="berita__card-category">{item.category}</span>
      </div>
      <div className="berita__card-body">
        <time className="berita__card-date">{item.date}</time>
        <h3 className="berita__card-title">{item.title}</h3>
        <p className="berita__card-excerpt">{item.excerpt}</p>
        <button className="berita__card-btn">
          <span>Baca Selengkapnya</span>
          <span className="berita__card-btn-arrow">→</span>
        </button>
      </div>
    </article>
  );
});

function scrambleText(el, finalText, callback) {
  if (!el) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  let frame = 0;
  let raf;
  const total = 20;
  const animate = () => {
    if (frame >= total) {
      el.textContent = finalText;
      if (callback) callback();
      return;
    }
    const progress = frame / total;
    el.textContent = finalText
      .split('')
      .map((c, i) => {
        if (c === ' ') return ' ';
        if (i < progress * finalText.length) return c;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    frame++;
    raf = requestAnimationFrame(animate);
  };
  animate();
  return () => cancelAnimationFrame(raf);
}

export default function Berita() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleText = 'Berita Terkini';

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      if (titleRef.current) titleRef.current.textContent = titleText;
      return;
    }

    let scrambleCleanup;

    const st = ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (titleRef.current) {
          scrambleCleanup = scrambleText(titleRef.current, titleText);
        }
      },
    });

    gsap.from('.berita__card', {
      opacity: 0, y: 60, scale: 0.96,
      stagger: 0.15, duration: 0.8, ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: { trigger: '.berita__grid', start: 'top 85%', once: true }
    });

    return () => {
      st.kill();
      if (scrambleCleanup) scrambleCleanup();
      ScrollTrigger.getAll().forEach(t => {
        if (section.contains(t.trigger)) t.kill();
      });
    };
  }, { scope: sectionRef, useLayoutEffect: true });

  return (
    <section id="berita" className="berita section" ref={sectionRef}>
      <div className="berita__container section__container">
        <div className="section__header">
          <div className="section__badge">Update</div>
          <h2 className="berita__title" ref={titleRef}>&nbsp;</h2>
          <p className="section__subtitle">
            Ikuti perkembangan terbaru dari Devacctto — mulai dari workshop, prestasi, hingga rekrutmen anggota baru.
          </p>
        </div>

        <div className="berita__grid">
          {newsData.map((item, idx) => (
            <BeritaCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        <div className="berita__footer">
          <button className="berita__all-btn">
            <span>Lihat Semua Berita</span>
            <span className="berita__all-btn-arrow">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
