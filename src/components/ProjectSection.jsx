import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Lorem ipsum dolor",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    color: "var(--color-accent)",
  },
  {
    title: "Lorem ipsum dolor",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    color: "var(--color-secondary)",
  },
  {
    title: "Lorem ipsum dolor",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    color: "var(--color-warning)",
  },
  {
    title: "Lorem ipsum dolor",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    color: "#9D4EDD",
  },
];

const ProjectSection = () => {
  const container = useRef();
  const wrapper = useRef();

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".project__slide");

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + wrapper.current.offsetWidth,
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      className="section project-horizontal"
      id="projects"
      ref={container}
    >
      <div className="section__header project__header">
        <h2 className="section__title project__title">Proyek Unggulan</h2>
      </div>

      <div
        className="project__wrapper"
        ref={wrapper}
        style={{
          width: `${projects.length * 100}vw`,
        }}
      >
        {projects.map((proj, i) => (
          <div className="project__slide" key={i}>
            {/* Number background - positioned to not interfere with text */}
            <span
              className="project__slide-number"
              style={{ color: proj.color }}
            >
              0{i + 1}
            </span>

            <div className="project__slide-content">
              <div className="project__slide-info">
                <h3 className="project__slide-title">{proj.title}</h3>
                <p className="project__slide-desc">{proj.desc}</p>
                <button
                  className="project__slide-btn"
                  style={{ background: proj.color }}
                >
                  View Project Case Study
                </button>
              </div>

              <div className="project__slide-visual">
                <div className="project__slide-visual-inner">
                  {/* Artistic background text */}
                  <div
                    className="project__slide-bgtext"
                    style={{ color: proj.color }}
                  >
                    {proj.title.split(" ")[0]}
                  </div>

                  {/* Floating badge */}
                  <div
                    className="project__slide-badge"
                    style={{
                      color: proj.color,
                      border: `2px solid ${proj.color}20`,
                    }}
                  >
                    Live Project 0{i + 1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
