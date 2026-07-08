import { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import logoImg from "../assets/divisionlogos.webp";

gsap.registerPlugin(ScrollTrigger);

const HeroVideo = () => {
  const container = useRef();
  const subtitleRef = useRef();
  const titleWordRefs = useRef([]);
  const actionBtnRefs = useRef([]);

  const { isLowEnd, prefersReduced, skipAnim } = useMemo(() => {
    const lowEnd = (() => {
      if (typeof navigator === "undefined") return false;
      const ram = navigator.deviceMemory;
      const cores = navigator.hardwareConcurrency || 4;
      const conn = navigator.connection?.effectiveType;
      return (ram && ram <= 2) || cores <= 2 || conn === "2g" || conn === "slow-2g";
    })();

    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;

    return {
      isLowEnd: lowEnd,
      prefersReduced: reduced,
      skipAnim: reduced || (mobile && lowEnd),
    };
  }, []);

  const verticalLines = useMemo(() =>
    isLowEnd ? [] : Array.from({ length: 5 }, (_, i) => (
      <div key={`v-${i}`} className="hero__grid-line hero__grid-line--v" style={{ left: `${(i + 1) * 16.67}%` }} />
    )),
  [isLowEnd]);

  const horizontalLines = useMemo(() =>
    isLowEnd ? [] : Array.from({ length: 3 }, (_, i) => (
      <div key={`h-${i}`} className="hero__grid-line hero__grid-line--h" style={{ top: `${(i + 1) * 25}%` }} />
    )),
  [isLowEnd]);

  const subtitleText = skipAnim
    ? "Membangun infrastruktur perangkat lunak dengan presisi matematis."
    : "";

  useGSAP(() => {
    if (skipAnim) {
      titleWordRefs.current.forEach(el => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      actionBtnRefs.current.forEach(el => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });
      return;
    }

    const tl = gsap.timeline();

    tl.fromTo(
      titleWordRefs.current.filter(Boolean),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" },
    ).fromTo(
      actionBtnRefs.current.filter(Boolean),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.2",
    );

    const words = [
      "Membangun infrastruktur perangkat lunak dengan presisi matematis.",
      "Menghadirkan solusi teknologi dengan performa tak tertandingi.",
      "Inovasi digital untuk masa depan industri masa kini.",
    ];

    let wordIndex = 0;
    let timeoutId;
    let currentAnimation;
    let isKilled = false;

    const playTypewriter = () => {
      if (isKilled) return;
      const word = words[wordIndex];
      const proxy = { count: 0 };

      currentAnimation = gsap.timeline({
        onComplete: () => {
          if (isKilled) return;
          wordIndex = (wordIndex + 1) % words.length;
          timeoutId = setTimeout(playTypewriter, 1000);
        },
      });

      currentAnimation
        .to(proxy, {
          count: word.length,
          duration: word.length * 0.04,
          ease: "none",
          onUpdate: () => {
            if (subtitleRef.current) {
              subtitleRef.current.textContent = word.substring(0, Math.ceil(proxy.count));
            }
          },
        })
        .to({}, { duration: 2.5 })
        .to(proxy, {
          count: 0,
          duration: word.length * 0.02,
          ease: "none",
          onUpdate: () => {
            if (subtitleRef.current) {
              subtitleRef.current.textContent = word.substring(0, Math.ceil(proxy.count));
            }
          },
        });
    };

    timeoutId = setTimeout(playTypewriter, 2000);

    const logoEl = container.current?.querySelector(".hero__bg-logo");
    if (logoEl) {
      gsap.fromTo(logoEl,
        { scale: 0.8, opacity: 0, rotation: -15 },
        {
          scale: 1,
          opacity: isLowEnd ? 0.2 : 0.4,
          rotation: 0,
          duration: 1.5,
          ease: "power3.out",
          onComplete: () => {
            if (!isLowEnd && !prefersReduced) {
              logoEl.classList.add("hero__bg-logo--float");
            }
          },
        }
      );
    }

    if (!isLowEnd) {
      gsap.to(".hero__scroll-wrapper", {
        y: 150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      isKilled = true;
      clearTimeout(timeoutId);
      if (currentAnimation) currentAnimation.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container.current || container.current?.contains(t.trigger)) {
          t.kill();
        }
      });
    };
  }, { scope: container, useLayoutEffect: true });

  return (
    <section className="hero" id="hero" ref={container}>
      <div className="hero__scroll-wrapper">
        {!isLowEnd && (
          <div className="hero__grid">
            {verticalLines}
            {horizontalLines}
          </div>
        )}

        <div className="hero__shapes">
          <div className="hero__shape hero__shape--1"></div>
          <div className="hero__shape hero__shape--2"></div>
          <div className="hero__shape hero__shape--3"></div>
        </div>

        <div className="hero__bg-logo">
          <img src={logoImg} alt="Devaccto Logo Background" decoding="async" />
        </div>

        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-word" ref={el => titleWordRefs.current[0] = el}>Software</span>
            <span className="hero__title-word hero__title-highlight" ref={el => titleWordRefs.current[1] = el}>Engineering</span>
          </h1>

          <p ref={subtitleRef} className="hero__subtitle">{subtitleText}</p>

          <div className="hero__actions">
            <button ref={el => actionBtnRefs.current[0] = el} className="hero__btn-primary">Start Consultation</button>
            <button ref={el => actionBtnRefs.current[1] = el} className="hero__btn-secondary">View Our Projects</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
