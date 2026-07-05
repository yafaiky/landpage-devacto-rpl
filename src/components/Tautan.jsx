import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { linksData } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

// Text Replace (scramble) for title
function scrambleText(el, finalText) {
  if (!el) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
  let frame = 0;
  const total = 22;
  let raf;
  const animate = () => {
    if (frame >= total) { el.textContent = finalText; return; }
    const progress = frame / total;
    el.textContent = finalText.split('').map((c, i) => {
      if (c === ' ') return ' ';
      if (i < progress * finalText.length) return c;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    frame++;
    raf = requestAnimationFrame(animate);
  };
  animate();
  return () => cancelAnimationFrame(raf);
}

export default function Tautan() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [scrambled, setScrambled] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Title text replace
      const titleSt = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 85%',
        onEnter: () => {
          if (prefersReduced) {
            if (titleRef.current) titleRef.current.textContent = 'Tautan Berguna';
          } else {
            scrambleText(titleRef.current, 'Tautan Berguna');
          }
        }
      });

      if (!prefersReduced) {
        // Cards animated entrance
        gsap.from('.tautan__card', {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: '.tautan__grid', start: 'top 85%', invalidateOnRefresh: true }
        });
      }

      return () => titleSt.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tautan" className="tautan section" ref={sectionRef}>
      <div className="tautan__container section__container">
        <div className="section__header">
          <div className="section__badge">
            <span className="section__badge-dot" />
            Resources
          </div>
          <h2 className="section__title tautan__title" ref={titleRef}>&nbsp;</h2>
          <p className="section__subtitle">
            Kumpulan referensi terpilih yang digunakan anggota Devacctto setiap hari.
          </p>
        </div>

        <div className="tautan__grid">
          {linksData.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tautan__card"
            >
              <div className="tautan__card-header">
                <span className="tautan__card-category">{link.category}</span>
                {link.external && (
                  <span className="tautan__card-external">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                )}
              </div>
              <h3 className="tautan__card-title">{link.title}</h3>
              <p className="tautan__card-desc">{link.description}</p>
              <div className="tautan__card-footer">
                <span className="tautan__card-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}