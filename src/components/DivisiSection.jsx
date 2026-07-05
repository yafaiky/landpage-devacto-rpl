import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaGlobe, FaServer, FaPaintBrush, // Web
  FaShieldAlt, FaLock, FaUserSecret, // Cyber
  FaGamepad, FaUnity, FaVrCardboard, // Game
  FaBrain, FaDatabase, FaRobot, // ML
  FaMobileAlt, FaApple, FaAndroid, // Mobile
  FaArrowRight,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const divisions = [
  {
    id: "web",
    badge: "WEB & CLOUD",
    title: "Web Development",
    desc: "At Devaccto, Web Development is the foundation of our digital solutions. We build scalable, high-performance web applications tailored to solve complex business challenges, focusing on modern architectures, responsive design, and robust backend systems.",
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
    desc: "Protecting digital assets is our top priority. The Cyber Security division focuses on identifying vulnerabilities, implementing robust defense mechanisms, and ensuring compliance with the highest data protection standards.",
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
    desc: "We bring imagination to life through interactive experiences. Our Game Development team combines technical expertise with creative storytelling to build engaging 2D and 3D games across multiple platforms.",
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
    desc: "Machine Learning is at the heart of our innovation. Our division is built to design, train, and deploy intelligent models that solve real-world challenges. From cutting-edge research to scalable MLOps, we turn data into impact.",
    themeColor: "#6366F1",
    Image: "/imageDivisi/machine.jpg",
    departments: [
      { icon: FaBrain, title: "Machine Learning Research", desc: "Exploring advanced algorithms and deep learning techniques to build intelligent solutions." },
      { icon: FaDatabase, title: "MLOps & Engineering", desc: "Building and scaling reliable pipelines, model deployment, and performance monitoring." },
      { icon: FaRobot, title: "AI Governance & Ethics", desc: "Ensuring model transparency, fairness, privacy, and regulatory compliance across initiatives." }
    ]
  },
  {
    id: "mobile",
    badge: "APPS",
    title: "Mobile Development",
    desc: "Connecting users on the go. The Mobile division specializes in crafting high-quality, native and cross-platform applications that deliver exceptional performance and native-like experiences on all devices.",
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
  const container = useRef();
  const hoverImageRef = useRef(null);
  const hoverImageSrcRef = useRef(null);

  // Initialize hover image centering
  useGSAP(() => {
    if (hoverImageRef.current) {
      gsap.set(hoverImageRef.current, { xPercent: -50, yPercent: -50 });
    }
  });

  const handleMouseMove = (e) => {
    gsap.to(hoverImageRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
      ease: "power3.out"
    });
  };

  const handleMouseEnter = (imgUrl) => {
    if (hoverImageSrcRef.current) {
      hoverImageSrcRef.current.src = imgUrl;
    }
    gsap.to(hoverImageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(hoverImageRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".divisi__card");
      const totalCards = cards.length;

      cards.forEach((card, i) => {
        // Stack offset — each card sits slightly higher than the previous
        const stackTop = 80 + i * 20; // px from top of sticky container

        gsap.set(card, {
          position: "sticky",
          top: stackTop,
          zIndex: i + 1,
          transformOrigin: "top center",
        });

        // All cards EXCEPT the last one shrink when the NEXT card scrolls over them
        if (i < totalCards - 1) {
          const scaleValue = 1 - (totalCards - i - 1) * 0.04;

          ScrollTrigger.create({
            trigger: cards[i + 1],       // triggered when the next card enters
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(card, {
                scale: 1 - progress * (1 - scaleValue),
                filter: `brightness(${1 - progress * 0.15})`,
              });
            },
          });
        }

        // Entrance animation for each card
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section className="section divisi-section-new" id="divisions" ref={container}>
      <div className="section__header divisi__header">
        <h2 className="section__title project__title">Divisi Devacto IT</h2>
      </div>

      <div className="section__container">
        <div className="divisi__list">
          {divisions.map((div, i) => (
            <div
              className="divisi__card"
              key={div.id}
            >
              {/* LEFT PANE - CONTENT */}
              <div className="divisi__pane-left">
                <div className="divisi__badge">
                  <img src="/devacto.png" alt="Devaccto Icon" className="divisi__badge-img" />
                  <span className="divisi__badge-text">DIVISI DEVACTO IT</span>
                </div>

                <h3
                  className="divisi__title"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => handleMouseEnter(div.Image)}
                  onMouseLeave={handleMouseLeave}
                  style={{ '--underline-color': div.themeColor }}
                >
                  {div.title}
                </h3>
                <p className="divisi__desc">{div.desc}</p>

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

              {/* RIGHT PANE - VISUAL & ACTION */}
              <div className="divisi__pane-right" style={{ backgroundColor: `${div.themeColor}10` }}>
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
      </div>

      {/* Floating Hover Image */}
      <div className="divisi__hover-image-container" ref={hoverImageRef}>
        <img ref={hoverImageSrcRef} alt="Hover Effect" className="divisi__hover-image" />
      </div>
    </section>
  );
};

export default DivisiSection;
