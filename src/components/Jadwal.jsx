import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scheduleData } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

const statusLabel = { upcoming: 'Akan Datang', done: 'Selesai', active: 'Berlangsung' };
const statusColor = {
  upcoming: 'var(--color-accent)',
  done: '#6B7280',
  active: '#10B981',
};

export default function Jadwal() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Animated connecting line
      gsap.from('.jadwal__line-fill', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.jadwal__timeline',
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: true,
        }
      });

      // Cards sequential reveal
      gsap.from('.jadwal__item', {
        opacity: 0, x: -40,
        stagger: 0.12, duration: 0.7, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.jadwal__timeline', start: 'top 85%', invalidateOnRefresh: true }
      });

      // Date badges pop
      gsap.from('.jadwal__date-badge', {
        scale: 0, opacity: 0, stagger: 0.12,
        duration: 0.5, ease: 'back.out(2)',
        immediateRender: false,
        scrollTrigger: { trigger: '.jadwal__timeline', start: 'top 85%', invalidateOnRefresh: true }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="jadwal" className="jadwal section section--grey" ref={sectionRef}>
      <div className="jadwal__container">
        <div className="section__header">
          <div className="section__badge">
            <span className="section__badge-dot" />
            Timeline
          </div>
          <h2 className="section__title">Jadwal Kegiatan</h2>
          <p className="section__subtitle">
            Pantau semua agenda Devacctto — dari workshop teknis hingga kompetisi nasional.
          </p>
        </div>

        <div className="jadwal__timeline">
          {/* Vertical connecting line */}
          <div className="jadwal__line">
            <div className="jadwal__line-fill" />
          </div>

          {scheduleData.map((event) => (
            <div key={event.id} className="jadwal__item">
              {/* Date Badge */}
              <div className="jadwal__date-badge" style={{ '--status-color': statusColor[event.status] }}>
                <span className="jadwal__date-day">{event.date}</span>
                <span className="jadwal__date-year">{event.year}</span>
              </div>

              {/* Card */}
              <div className="jadwal__card" data-status={event.status}>
                <div className="jadwal__card-header">
                  <h3 className="jadwal__card-title">{event.title}</h3>
                  <span
                    className="jadwal__card-status"
                    style={{ background: statusColor[event.status] + '22', color: statusColor[event.status] }}
                  >
                    {statusLabel[event.status]}
                  </span>
                </div>
                <p className="jadwal__card-desc">{event.description}</p>
                <div className="jadwal__card-meta">
                  <span className="jadwal__meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {event.time}
                  </span>
                  <span className="jadwal__meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}