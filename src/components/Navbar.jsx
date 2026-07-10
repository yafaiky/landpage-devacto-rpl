import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const navRef = useRef();

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 50px 40px)",
        duration: 0.8,
        ease: "power4.inOut",
      });

      gsap.fromTo(
        ".navbar__mobile-link",
        { y: 50, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 50px 40px)",
        duration: 0.6,
        ease: "power4.in",
      });
    }
  }, { scope: navRef, dependencies: [isOpen], useLayoutEffect: true });

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar__inner">

        <div className="navbar__left">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`navbar__burger-custom ${isOpen ? "open" : ""}`}
            aria-label="Toggle menu"
          >
            <span className="navbar__burger-line navbar__burger-line--1"></span>
            <span className="navbar__burger-line navbar__burger-line--2"></span>
          </button>

          <a href="#" className={`navbar__logo ${isOpen ? "open" : ""}`}>
            Devaccto
          </a>
        </div>

        <div className="navbar__right">
          <ThemeToggle />
          <button className={`navbar__cta-custom ${isOpen ? "open" : ""}`}>
            Work with us
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`navbar__mobile-overlay ${isOpen ? "open" : ""}`}
      >
        <div className="navbar__mobile-grid"></div>

        <div className="navbar__mobile-links">
          {["About", "Divisions", "Projects", "Berita", "Tag" , "Tautan" ].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="navbar__mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ),
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
