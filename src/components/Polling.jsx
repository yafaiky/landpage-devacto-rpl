import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pollingData } from '../data/content.js';

gsap.registerPlugin(ScrollTrigger);

export default function Polling() {
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(pollingData.options.map((o) => o.votes));
  const total = votes.reduce((a, b) => a + b, 0);

  // Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;
      gsap.from('.polling__container', {
        opacity: 0, y: 50,
        duration: 0.9, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top 85%', invalidateOnRefresh: true }
      });
      gsap.from('.polling__option', {
        opacity: 0, x: -30, stagger: 0.1, duration: 0.6,
        immediateRender: false,
        scrollTrigger: { trigger: '.polling__options', start: 'top 90%', invalidateOnRefresh: true }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate progress bars after vote
  useEffect(() => {
    if (!voted) return;
    document.querySelectorAll('.polling__bar-fill').forEach((bar, i) => {
      const pct = (votes[i] / total) * 100;
      gsap.fromTo(bar, { width: '0%' }, { width: `${pct}%`, duration: 1, delay: i * 0.08, ease: 'power2.out' });
    });
    // Animate counters
    document.querySelectorAll('.polling__pct').forEach((el, i) => {
      const pct = Math.round((votes[i] / total) * 100);
      gsap.fromTo({ val: 0 }, { val: pct },
        { duration: 1, delay: i * 0.08, ease: 'power2.out',
          onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + '%'; }
        }
      );
    });
  }, [voted]);

  const handleVote = () => {
    if (selected === null || voted) return;
    const next = [...votes];
    next[selected] += 1;
    setVotes(next);
    setVoted(true);
  };

  return (
    <section id="polling" className="polling section" ref={sectionRef}>
      <div className="polling__container section__container">
        <div className="section__header">
          <div className="section__badge">
            <span className="section__badge-dot" />
            Polling
          </div>
          <h2 className="section__title">Suara Komunitas</h2>
          <p className="section__subtitle">
            Bantu kami merencanakan kurikulum terbaik. Pilih topik yang paling kamu inginkan.
          </p>
        </div>

        <div className="polling__card">
          <p className="polling__question">{pollingData.question}</p>

          <div className="polling__options">
            {pollingData.options.map((opt, i) => {
              const pct = Math.round((votes[i] / total) * 100);
              return (
                <button
                  key={opt.id}
                  className={`polling__option${selected === i ? ' polling__option--selected' : ''}${voted ? ' polling__option--voted' : ''}`}
                  onClick={() => !voted && setSelected(i)}
                  disabled={voted}
                >
                  <div className="polling__option-row">
                    <div className="polling__option-check">
                      {selected === i && <span className="polling__check-inner" />}
                    </div>
                    <span className="polling__option-label">{opt.label}</span>
                    {voted && <span className="polling__pct">{pct}%</span>}
                  </div>
                  {voted && (
                    <div className="polling__bar">
                      <div
                        className="polling__bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: selected === i ? 'var(--color-accent)' : '#CBD5E1'
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="polling__footer">
            {!voted ? (
              <button
                className="polling__vote-btn"
                onClick={handleVote}
                disabled={selected === null}
              >
                Kirim Suara
              </button>
            ) : (
              <p className="polling__thanks">
                ✓ Terima kasih! Suaramu telah dicatat. Total {total} suara.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}