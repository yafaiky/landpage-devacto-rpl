import React, { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaGlobe, FaServer, FaPaintBrush,
  FaShieldAlt, FaLock, FaUserSecret,
  FaGamepad, FaUnity, FaVrCardboard,
  FaBrain, FaDatabase, FaRobot,
  FaMobileAlt, FaApple, FaAndroid,
  FaArrowRight,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const divisions = [
  {
    id: "web",
    badge: "WEB & CLOUD",
    title: "Web Development",
    desc: "At Devaccto, Web Development is the foundation of our digital solutions. We build scalable, high-performance web applications tailored to solve complex business challenges.",
    themeColor: "#3B82F6",
    Image: "/imageDivisi/web.jpg",
    departments: [
      { icon: FaGlobe, title: "Frontend Engineering", desc: "Crafting intuitive and pixel-perfect user interfaces with React, Vue, and modern CSS frameworks." },
      { icon: FaServer, title: "Backend & API", desc: "Building secure and scalable server-side applications, RESTful APIs, and microservices." },
      { icon: FaPaintBrush, title: "UI/UX Implementation", desc: "Bridging the gap between design and engineering for seamless user experiences." }
    ]
  },
  {
    id: "cycec",
    badge: "SECURITY",
    title: "Cyber Security",
    desc: "Protecting digital assets is our top priority. The Cyber Security division focuses on identifying vulnerabilities and implementing robust defense mechanisms.",
    themeColor: "#EF4444",
    Image: "/imageDivisi/cycec.jpg",
    departments: [
      { icon: FaShieldAlt, title: "Penetration Testing", desc: "Simulating cyber attacks to identify and patch security vulnerabilities in applications." },
      { icon: FaLock, title: "Cryptography", desc: "Implementing advanced encryption standards to secure sensitive user data in transit and at rest." },
      { icon: FaUserSecret, title: "Security Auditing", desc: "Conducting comprehensive reviews of codebases and infrastructure for compliance." }
    ]
  },
  {
    id: "game",
    badge: "INTERACTIVE",
    title: "Game Development",
    desc: "We bring imagination to life through interactive experiences. Our Game Development team combines technical expertise with creative storytelling.",
    themeColor: "#8B5CF6",
    Image: "/imageDivisi/game.jpg",
    departments: [
      { icon: FaGamepad, title: "Gameplay Programming", desc: "Coding core mechanics, player controls, and interactive game physics." },
      { icon: FaUnity, title: "Engine Development", desc: "Optimizing performance and building custom tools using engines like Unity and Unreal." },
      { icon: FaVrCardboard, title: "AR/VR Experiences", desc: "Pushing boundaries with immersive augmented and virtual reality applications." }
    ]
  },
  {
    id: "ml",
    badge: "ARTIFICIAL INTELLIGENCE",
    title: "Machine Learning",
    desc: "Machine Learning is at the heart of our innovation. We design, train, and deploy intelligent models that solve real-world challenges at scale.",
    themeColor: "#6366F1",
    Image: "/imageDivisi/machine.jpg",
    departments: [
      { icon: FaBrain, title: "ML Research", desc: "Exploring advanced algorithms and deep learning techniques to build intelligent solutions." },
      { icon: FaDatabase, title: "MLOps & Engineering", desc: "Building and scaling reliable pipelines, model deployment, and performance monitoring." },
      { icon: FaRobot, title: "AI Governance", desc: "Ensuring model transparency, fairness, privacy, and regulatory compliance across initiatives." }
    ]
  },
  {
    id: "mobile",
    badge: "APPS",
    title: "Mobile Development",
    desc: "Connecting users on the go. The Mobile division specializes in crafting high-quality, native and cross-platform apps that deliver exceptional performance.",
    themeColor: "#10B981",
    Image: "/imageDivisi/mobile.jpg",
    departments: [
      { icon: FaMobileAlt, title: "Cross-Platform Dev", desc: "Building versatile apps using Flutter and React Native for wider reach." },
      { icon: FaApple, title: "iOS Engineering", desc: "Developing optimized, high-performance applications specifically for the Apple ecosystem." },
      { icon: FaAndroid, title: "Android Engineering", desc: "Creating robust and scalable applications tailored for the diverse Android market." }
    ]
  }
];

const DivisiSection = () => {
  const container = useRef(null);
  const cardRefs = useRef([]);

  // ── Hover Image (cursor-follow) refs ──────────────────────
  const hoverImgWrap = useRef(null);
  const hoverImgEl = useRef(null);
  const isHovered = useRef(false);

  // Set initial transform once
  useGSAP(() => {
    if (hoverImgWrap.current) {
      gsap.set(hoverImgWrap.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    }
  });

  const handleTitleMouseMove = useCallback((e) => {
    if (!hoverImgWrap.current) return;
    gsap.to(hoverImgWrap.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.45,
      ease: "power3.out",
    });
  }, []);

  const handleTitleMouseEnter = useCallback((imgSrc) => {
    if (!hoverImgWrap.current || !hoverImgEl.current) return;
    isHovered.current = true;
    hoverImgEl.current.src = imgSrc;
    gsap.to(hoverImgWrap.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.4)",
    });
  }, []);

  const handleTitleMouseLeave = useCallback(() => {
    if (!hoverImgWrap.current) return;
    isHovered.current = false;
    gsap.to(hoverImgWrap.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  }, []);

  // ── Stacked Cards GSAP ────────────────────────────────────
  useGSAP(
    () => {
      const totalCards = divisions.length;
      const cardElements = cardRefs.current.filter(Boolean);
      if (!cardElements[0]) return;

      cardElements.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          zIndex: i + 1,
          y: i === 0 ? "0%" : "150vh",
          scale: 1,
          rotation: 0,
          transformOrigin: "center bottom",
        });
      });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".divisi__sticky-stage",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        if (!currentCard || !nextCard) continue;

        // Current card: scale down + slight rotation
        scrollTimeline.to(
          currentCard,
          { scale: 0.9, rotation: -3, duration: 1, ease: "none" },
          i
        );

        // Next card: slide up from below
        scrollTimeline.to(
          nextCard,
          { y: "0%", duration: 1, ease: "none" },
          i
        );
      }

      const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
      if (container.current) resizeObserver.observe(container.current);

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: container }
  );

  return (
    <section className="divisi-section-v2" id="divisions" ref={container}>

      {/* ── Section Header ───────────────────────────────── */}
      <div className="divisi__header-v2">
        <div className="divisi__header-eyebrow">
          <span>Divisi Kami</span>
        </div>
        <h2 className="section__title project__title">Divisi Devacto IT</h2>
        <p className="divisi__header-sub">Scroll untuk menjelajahi setiap divisi ↓</p>
      </div>

      {/* ── Pinned sticky stage ──────────────────────────── */}
      <div className="divisi__sticky-stage">
        <div className="divisi__stack-container">
          {divisions.map((div, i) => (
            <div
              key={div.id}
              className="divisi__stack-card"
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ "--theme-color": div.themeColor }}
            >
              {/* Card counter */}
              <div className="divisi__card-counter">
                <span className="divisi__card-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="divisi__card-total">/ {String(divisions.length).padStart(2, "0")}</span>
              </div>

              {/* ── LEFT PANE ── */}
              <div className="divisi__pane-left">
                {/* Badge */}
                <div className="divisi__badge">
                  <img src="/devacto.png" alt="Devaccto" className="divisi__badge-img" />
                  <span className="divisi__badge-text">DIVISI DEVACTO IT</span>
                </div>

                {/* Accent bar */}
                <div className="divisi__theme-accent" style={{ backgroundColor: div.themeColor }} />

                {/* ★ Title with hover-image effect ★ */}
                <h3
                  className="divisi__title"
                  style={{ "--underline-color": div.themeColor }}
                  onMouseMove={handleTitleMouseMove}
                  onMouseEnter={() => handleTitleMouseEnter(div.Image)}
                  onMouseLeave={handleTitleMouseLeave}
                >
                  {div.title}
                </h3>

                <p className="divisi__desc">{div.desc}</p>

                {/* Departments */}
                <div className="divisi__departments">
                  {div.departments.map((dept, j) => (
                    <div className="divisi__dept-item" key={j}>
                      <div className="divisi__dept-icon" style={{ backgroundColor: div.themeColor }}>
                        <dept.icon />
                      </div>
                      <div className="divisi__dept-content">
                        <h4 className="divisi__dept-title">{dept.title}</h4>
                        <p className="divisi__dept-desc">{dept.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT PANE ── */}
              <div className="divisi__pane-right" style={{ background: `${div.themeColor}12` }}>
                {/* Mobile-only image strip */}
                <div className="divisi__mobile-img-strip">
                  <img src={div.Image} alt={div.title} className="divisi__mobile-strip-img" />
                  <div className="divisi__mobile-strip-overlay" style={{ background: `linear-gradient(to right, ${div.themeColor}22, transparent)` }} />
                </div>

                <div className="divisi__illustration">
                  <img src={div.Image} alt={div.title} className="divisi__image" />
                </div>

                <button className="divisi__explore-btn">
                  Explore Departments
                  <FaArrowRight className="divisi__explore-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <p className="divisi__scroll-hint">SCROLL TO EXPLORE ↓</p>
      </div>

      {/* ── Cursor-follow hover image (fixed, follows mouse globally) ── */}
      <div className="divisi__hover-img-wrap" ref={hoverImgWrap}>
        <img
          ref={hoverImgEl}
          alt=""
          className="divisi__hover-img"
          onError={(e) => { e.target.style.opacity = 0; }}
        />
      </div>

    </section>
  );
};

export default DivisiSection;
