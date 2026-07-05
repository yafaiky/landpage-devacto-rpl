import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { newsData } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

// Text Replace (scramble) effect — no plugin needed
function useTextScramble(el, finalText, trigger) {
    useEffect(() => {
        if (!el || !trigger) return;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
        let frame = 0;
        let raf;
        const total = 20;
        const animate = () => {
            if (frame >= total) {
                el.textContent = finalText;
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
    }, [el, finalText, trigger]);
}

function BeritaCard({ item, index }) {
    return (
        <article className={`berita__card berita__card--${index}`} style={{ '--i': index }}>
            <div className="berita__card-img-wrap">
                <img src={item.image} alt={item.title} className="berita__card-img" loading="lazy" />
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
}

export default function Berita() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const [scrambleTrigger, setScrambleTrigger] = useState(false);
    const TITLE = 'Berita Terkini';

    // Text Replace on scroll
    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                if (!prefersReduced) setScrambleTrigger(true);
                else el.textContent = TITLE;
            },
        });
        return () => st.kill();
    }, []);

    useTextScramble(titleRef.current, TITLE, scrambleTrigger);

    // Card stagger reveal
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ctx = gsap.context(() => {
            if (prefersReduced) return;
            gsap.from('.berita__card', {
                opacity: 0, y: 60, scale: 0.96,
                stagger: 0.15, duration: 0.8, ease: 'power3.out',
                immediateRender: false,
                scrollTrigger: { trigger: '.berita__grid', start: 'top 85%', invalidateOnRefresh: true }
            });
        }, section);
        return () => ctx.revert();
    }, []);

    return (
        <section id="berita" className="berita section" ref={sectionRef}>
            <div className="berita__container section__container">
                <div className="section__header">
                    <div className="section__badge">
                        <span className="section__badge-dot" />
                        Update
                    </div>
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