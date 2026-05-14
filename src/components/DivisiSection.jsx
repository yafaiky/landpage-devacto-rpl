import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const divisions = [
  {
    num: "01",
    title: "Web Development",
    features: [
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
    ],
  },
  {
    num: "02",
    title: "Cyber Security",
    features: [
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
    ],
  },
  {
    num: "03",
    title: "Game Development",
    features: [
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
    ],
  },
  {
    num: "04",
    title: "Machine Learning",
    features: [
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
    ],
  },
  {
    num: "05",
    title: "Mobile Development",
    features: [
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
      "lorem ipsum dolor sit amet ",
    ],
  },
];

const DivisiSection = () => {
  const container = useRef();

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".divisi__full-item");

      items.forEach((item, i) => {
        const isOdd = i % 2 !== 0;

        const content = item.querySelector(".divisi__full-content");
        const visual = item.querySelector(".divisi__full-visual");

        gsap.fromTo(
          content,
          { x: isOdd ? 100 : -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "bottom center",
              toggleActions: "play reverse play reverse",
            },
          },
        );

        gsap.fromTo(
          visual,
          { x: isOdd ? -100 : 100, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "bottom center",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <section
      className="section divisi-section-container"
      id="divisions"
      ref={container}
    >
      <div className="section__container">
        <div className="section__header divisi-header-custom">
          <h2 className="section__title divisi-title-custom">
            Tim Ahli di Setiap
            <br />
            Bidang Teknologi
          </h2>
        </div>

        <div className="divisi__full-list">
          {divisions.map((div, i) => {
            const isOdd = i % 2 !== 0;
            const colors = [
              "var(--color-accent)",
              "var(--color-secondary)",
              "var(--color-warning)",
              "#9D4EDD",
              "#D90429",
            ];
            const color = colors[i % colors.length];

            return (
              <div
                className={`divisi__full-item ${isOdd ? "divisi__full-item--reverse" : ""}`}
                key={i}
              >
                <div className="divisi__full-content">
                  <span className="divisi__full-num" style={{ color }}>
                    {div.num}
                  </span>
                  <h3 className="divisi__full-title">{div.title}</h3>
                  <ul className="divisi__full-features">
                    {div.features.map((feat, j) => (
                      <li className="divisi__full-feature" key={j}>
                        <svg
                          className="divisi__check"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={color}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="divisi__full-btn"
                    style={{ background: color }}
                  >
                    Explore More
                  </button>
                </div>

                <div
                  className="divisi__full-visual"
                  style={{
                    background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                    borderColor: `${color}30`,
                  }}
                >
                  <div
                    className="divisi__visual-shape"
                    style={{ background: color }}
                  ></div>
                  <div
                    className="divisi__visual-shape-2"
                    style={{ border: `8px solid ${color}40` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DivisiSection;
