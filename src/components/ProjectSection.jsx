import { useRef, useCallback, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const isLowEnd = (() => {
  if (typeof navigator === "undefined") return false;
  const ram = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency || 4;
  return (ram && ram <= 2) || cores <= 2;
})();

const cards = [
  {
    label: "LOREM IPSUM",
    title: "Lorem Ipsum Dolor",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    color: "#E63946",
    badge: "Live Project",
    num: "01",
    image: "/projects/web-platform.webp",
    techStack: ["Lorem", "Ipsum", "Dolor"]
  },
  {
    label: "SIT AMET",
    title: "Consectetur Adipiscing",
    desc: "Elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.",
    color: "#00D2D3",
    badge: "Case Study",
    num: "02",
    image: "/projects/mobile-app.webp",
    techStack: ["Elit", "Tempor", "Magna"]
  },
  {
    label: "DOLORE MAGNA",
    title: "Ut Enim Ad Minima",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.",
    color: "#FFBE0B",
    badge: "In Development",
    num: "03",
    image: "/projects/dashboard.webp",
    techStack: ["Ullamco", "Commodo", "Aute"]
  },
  {
    label: "EXCEPTEUR",
    title: "Sint Occaecat",
    desc: "Cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis.",
    color: "#9D4EDD",
    badge: "Live Project",
    num: "04",
    image: "/projects/automation.webp",
    techStack: ["Culpa", "Officia", "Laborum"]
  },
];

const ProjectCard = memo(({ card }) => {
  const handleMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(e.currentTarget, {
      x: x * 0.3, y: y * 0.3,
      duration: 0.4, ease: "power2.out", overwrite: "auto",
    });
  }, []);

  const handleMouseLeave = useCallback((e) => {
    gsap.to(e.currentTarget, {
      x: 0, y: 0,
      duration: 0.4, ease: "power2.out",
    });
  }, []);

  return (
    <article
      className="project__card"
      style={{ "--c": card.color, "--i": 0 }}
    >
      <div className="project__card-image-wrapper">
        <img
          src={card.image}
          alt={card.title}
          className="project__card-image"
          loading="lazy"
          decoding="async"
        />
        <div className="project__card-badge">{card.badge}</div>
        <div className="project__card-img-overlay" />
      </div>

      <div className="project__card-content">
        <span className="project__card-num" aria-hidden="true">{card.num}</span>

        <div className="project__card-label-area">
          <span className="project__card-label">{card.label}</span>
          <h3 className="project__card-title">{card.title}</h3>
        </div>

        <p className="project__card-desc">{card.desc}</p>

        <div className="project__card-footer">
          <div className="project__tech-stack">
            {card.techStack.map((tech, idx) => (
              <span key={idx} className="project__tech-pill">{tech}</span>
            ))}
          </div>

          <button
            className="project__card-btn"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <span>Lihat Detail</span>
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
});

export default function ProjectSection() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    if (isLowEnd) return;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const getMaxScroll = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    if (getMaxScroll() <= 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getMaxScroll() + window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, {
      x: () => -getMaxScroll(),
      ease: "none",
      duration: 1,
    });

    ScrollTrigger.refresh();

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, { scope: sectionRef });

  return (
    <section className="project-section" id="projects" ref={sectionRef}>
      <div className="project__header">
        <span className="project__eyebrow">PROJECT SHOWCASE</span>
        <h2 className="project__title">Karya Terbaik Kami</h2>
        <p className="project__desc">
          Solusi nyata yang kami bangun untuk klien dan industri.
        </p>
      </div>

      <div className="project__viewport" ref={viewportRef}>
        <div className="project__track" ref={trackRef}>
          {cards.map((card, i) => (
            <ProjectCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
