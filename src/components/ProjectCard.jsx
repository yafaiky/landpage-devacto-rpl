import { memo, useCallback } from "react";
import gsap from "gsap";
import { FaArrowRight } from "react-icons/fa";

export const cards = [
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
                <div className="project__card-img-overlay" />
            </div>

            <div className="project__card-content">
                <span className="project__card-label">{card.label}</span>
                <h3 className="project__card-title">{card.title}</h3>

                <p className="project__card-desc">{card.desc}</p>

                <div className="project__card-footer">
                    <div className="project__tech-stack">
                        {card.techStack.map((tech, idx) => (
                            <span key={idx} className="project__tech-pill">{tech}</span>
                        ))}
                    </div>

                    <button className="divisi__explore-btn">
                        Explore Departments
                        <FaArrowRight className="divisi__explore-icon" />
                    </button>
                </div>
            </div>
        </article>
    );
});

export default ProjectCard;