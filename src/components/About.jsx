import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { aboutData } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

const isTouch = typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches;

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const isLowEnd = (() => {
  if (typeof navigator === 'undefined') return false;
  const ram = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency || 4;
  return (ram && ram <= 2) || cores <= 2;
})();

const skipFloatingImg = isTouch || isLowEnd || isMobile;

export default function About() {
  const sectionRef = useRef(null);
  const floatingImgEl = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const isVisible = useRef(false);
  const keywordRefs = useRef([]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!prefersReduced()) {
      gsap.from('.about__badge', {
        opacity: 0, y: 20, duration: 0.6,
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      });
      gsap.from('.about__stat', {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7,
        scrollTrigger: { trigger: '.about__stats', start: 'top 85%', once: true },
      });
      gsap.from('.about__headline', {
        opacity: 0, y: 40, duration: 0.9,
        scrollTrigger: { trigger: '.about__headline', start: 'top 88%', once: true },
      });
      gsap.from('.about__body', {
        opacity: 0, y: 30, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.about__body', start: 'top 90%', once: true },
      });
    }
  }, { scope: sectionRef });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || skipFloatingImg) return;

    const img = floatingImgEl.current;
    const lerp = (s, e, t) => s + (e - s) * t;

    const tick = () => {
      if (!isVisible.current) {
        rafId.current = null;
        return;
      }
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.1);
      if (img) {
        img.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting && !rafId.current) {
          rafId.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left - 100;
      mouse.current.y = e.clientY - rect.top - 80;
    };
    section.addEventListener('mousemove', onMouseMove, { passive: true });

    const handlers = [];
    keywordRefs.current.forEach((kw) => {
      if (!kw) return;
      const onEnter = () => {
        const imgSrc = kw.dataset.image;
        if (img) {
          img.src = imgSrc;
          gsap.killTweensOf(img);
          gsap.fromTo(img,
            { opacity: 0, scale: 0.85, rotation: -5 },
            { opacity: 1, scale: 1, rotation: gsap.utils.random(-4, 4), duration: 0.4, ease: 'back.out(1.5)' }
          );
        }
      };
      const onLeave = () => {
        if (img) gsap.to(img, { opacity: 0, scale: 0.9, duration: 0.25, ease: 'power2.in' });
      };
      kw.addEventListener('mouseenter', onEnter);
      kw.addEventListener('mouseleave', onLeave);
      handlers.push({ el: kw, onEnter, onLeave });
    });

    return () => {
      observer.disconnect();
      section.removeEventListener('mousemove', onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      handlers.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  const renderHeadline = () => {
    let text = aboutData.headline;
    let result = [];
    let lastIdx = 0;
    aboutData.keywords.forEach((kw, i) => {
      const idx = text.indexOf(kw.word, lastIdx);
      if (idx === -1) return;
      if (idx > lastIdx) result.push(<span key={`t${i}`}>{text.slice(lastIdx, idx)}</span>);
      result.push(
        <span key={`kw${i}`} className="about__keyword" data-image={kw.image} data-alt={kw.alt}
          ref={el => keywordRefs.current[i] = el}>
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
      {!skipFloatingImg && (
        <div className="about__floating-wrap">
          <img
            ref={floatingImgEl}
            className="about__floating-img"
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            alt="keyword preview"
            style={{ opacity: 0 }}
            decoding="async"
          />
        </div>
      )}

      <div className="about__container section__container">
        <div className="section__badge about__badge">{aboutData.badge}</div>

        <div className="about__layout">
          <div className="about__stats">
            {aboutData.stats.map((s) => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="about__text-col">
            <h2 className="about__headline">{renderHeadline()}</h2>
            <p className="about__body">{aboutData.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function prefersReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
