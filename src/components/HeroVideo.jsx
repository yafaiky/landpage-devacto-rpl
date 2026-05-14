import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import logoImg from "../assets/divisionlogos.png";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const HeroVideo = () => {
  const container = useRef();
  const subtitleRef = useRef();

  useGSAP(
    () => {
      // 1. Entrance Animations
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero__title-word",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
      ).fromTo(
        ".hero__actions button",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
        },
        "-=0.2",
      );

      // Reliable Typewriter Logic with proper cleanup
      const words = [
        "Membangun infrastruktur perangkat lunak dengan presisi matematis.",
        "Menghadirkan solusi teknologi dengan performa tak tertandingi.",
        "Inovasi digital untuk masa depan industri masa kini.",
      ];

      let wordIndex = 0;
      let timeoutId;
      let currentAnimation;

      const playTypewriter = () => {
        const word = words[wordIndex];
        const proxy = { count: 0 };

        currentAnimation = gsap.timeline({
          onComplete: () => {
            wordIndex = (wordIndex + 1) % words.length;
            timeoutId = setTimeout(playTypewriter, 1000);
          },
        });

        // Typing
        currentAnimation
          .to(proxy, {
            count: word.length,
            duration: word.length * 0.04,
            ease: "none",
            onUpdate: () => {
              if (subtitleRef.current) {
                subtitleRef.current.textContent = word.substring(
                  0,
                  Math.ceil(proxy.count),
                );
              }
            },
          })
          // Wait
          .to({}, { duration: 2.5 })
          // Deleting
          .to(proxy, {
            count: 0,
            duration: word.length * 0.02,
            ease: "none",
            onUpdate: () => {
              if (subtitleRef.current) {
                subtitleRef.current.textContent = word.substring(
                  0,
                  Math.ceil(proxy.count),
                );
              }
            },
          });
      };

      // Initial delay for the intro animation
      timeoutId = setTimeout(playTypewriter, 2000);

      // Logo background entrance & continuous float
      gsap.set(".hero__bg-logo", { scale: 0.8, opacity: 0, rotation: -15 });

      gsap.to(".hero__bg-logo", {
        scale: 1,
        opacity: 0.4,
        rotation: 0,
        duration: 1.5,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(".hero__bg-logo", {
            y: -30,
            rotation: 5,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      });

      // 2. Scroll Out Animations
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

      // Cleanup function
      return () => {
        clearTimeout(timeoutId);
        if (currentAnimation) currentAnimation.kill();
      };
    },
    { scope: container },
  );

  // Generate grid lines
  const verticalLines = Array.from({ length: 15 }, (_, i) => (
    <div
      key={`v-${i}`}
      className="hero__grid-line hero__grid-line--v"
      style={{ left: `${(i + 1) * 6.66}%` }}
    />
  ));

  const horizontalLines = Array.from({ length: 10 }, (_, i) => (
    <div
      key={`h-${i}`}
      className="hero__grid-line hero__grid-line--h"
      style={{ top: `${(i + 1) * 10}%` }}
    />
  ));

  return (
    <section className="hero" id="hero" ref={container}>
      <div className="hero__scroll-wrapper">
        <div className="hero__grid">
          {verticalLines}
          {horizontalLines}
        </div>

        <div className="hero__shapes">
          <div className="hero__shape hero__shape--1"></div>
          <div className="hero__shape hero__shape--2"></div>
          <div className="hero__shape hero__shape--3"></div>
        </div>

        <div className="hero__bg-logo">
          <img src={logoImg} alt="Devaccto Logo Background" />
        </div>

        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-word">Software</span>
            <span className="hero__title-word hero__title-highlight">
              Engineering
            </span>
          </h1>

          <p ref={subtitleRef} className="hero__subtitle" />

          <div className="hero__actions">
            <button className="hero__btn-primary">Start Consultation</button>
            <button className="hero__btn-secondary">View Our Projects</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
