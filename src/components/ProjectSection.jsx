import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCard, { cards } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const isLowEnd = (() => {
  if (typeof navigator === "undefined") return false;
  const ram = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency || 4;
  return (ram && ram <= 2) || cores <= 2;
})();

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
