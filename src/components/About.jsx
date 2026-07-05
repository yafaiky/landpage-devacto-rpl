import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const floatingImgRef = useRef(null);
  const floatingImgEl = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const activeKeyword = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    // Prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        // Badge
        gsap.from('.about__badge', {
          opacity: 0, y: 20, duration: 0.6,
          scrollTrigger: { trigger: section, start: 'top 85%' }
        });
        // Stats
        gsap.from('.about__stat', {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.7,
          scrollTrigger: { trigger: '.about__stats', start: 'top 85%' }
        });
        // Headline chars (manual split — no plugin needed)
        gsap.from('.about__headline', {
          opacity: 0, y: 40, duration: 0.9,
          scrollTrigger: { trigger: '.about__headline', start: 'top 88%' }
        });
        gsap.from('.about__body', {
          opacity: 0, y: 30, duration: 0.8, delay: 0.2,
          scrollTrigger: { trigger: '.about__body', start: 'top 90%' }
        });
      }

      // ── Keyword hover image effect ────────────────────────
      const keywords = section.querySelectorAll('.about__keyword');
      const img = floatingImgEl.current;

      const lerp = (start, end, t) => start + (end - start) * t;

      const tick = () => {
        pos.current.x = lerp(pos.current.x, mouse.current.x, 0.1);
        pos.current.y = lerp(pos.current.y, mouse.current.y, 0.1);
        if (img) {
          gsap.set(img, {
            x: pos.current.x,
            y: pos.current.y,
          });
        }
        rafId.current = requestAnimationFrame(tick);
      };
      rafId.current = requestAnimationFrame(tick);

      const onMouseMove = (e) => {
        const rect = section.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left - 100;
        mouse.current.y = e.clientY - rect.top - 80;
      };
      section.addEventListener('mousemove', onMouseMove);

      keywords.forEach((kw) => {
        kw.addEventListener('mouseenter', () => {
          const imgSrc = kw.dataset.image;
          if (img) {
            img.src = imgSrc;
            activeKeyword.current = kw;
            gsap.killTweensOf(img);
            gsap.fromTo(img,
              { opacity: 0, scale: 0.85, rotation: -5 },
              { opacity: 1, scale: 1, rotation: gsap.utils.random(-4, 4), duration: 0.4, ease: 'back.out(1.5)' }
            );
          }
        });

        kw.addEventListener('mouseleave', () => {
          activeKeyword.current = null;
          if (img) {
            gsap.to(img, { opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in' });
          }
        });
      });

      return () => {
        section.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(rafId.current);
      };
    }, section);

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Build headline with keyword spans
  const renderHeadline = () => {
    let text = aboutData.headline;
    let result = [];
    let lastIdx = 0;

    aboutData.keywords.forEach((kw, i) => {
      const idx = text.indexOf(kw.word, lastIdx);
      if (idx === -1) return;
      if (idx > lastIdx) result.push(<span key={`t${i}`}>{text.slice(lastIdx, idx)}</span>);
      result.push(
        <span
          key={`kw${i}`}
          className="about__keyword"
          data-image={kw.image}
          data-alt={kw.alt}
        >
          {kw.word}
        </span>
      );
      lastIdx = idx + kw.word.length;
    });
    if (lastIdx < text.length) result.push(<span key="tail">{text.slice(lastIdx)}</span>);
    return result;
  };

  return (
    <section id="about" className="about section" ref={sectionRef}>
      {/* Floating image */}
      <div className="about__floating-wrap" ref={floatingImgRef}>
        <img
          ref={floatingImgEl}
          className="about__floating-img"
          src=""
          alt="keyword preview"
          style={{ opacity: 0 }}
        />
      </div>

      <div className="about__container section__container">
        {/* Badge */}
        <div className="section__badge about__badge">
          <span className="section__badge-dot" />
          {aboutData.badge}
        </div>

        <div className="about__layout">
          {/* Left — Stats */}
          <div className="about__stats">
            {aboutData.stats.map((s) => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Right — Text */}
          <div className="about__text-col">
            <h2 className="about__headline">
              {renderHeadline()}
            </h2>
            <p className="about__body">{aboutData.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}