import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Check touch device
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const lerp = (s, e, t) => s + (e - s) * t;

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      gsap.set(ring, { x: ringX, y: ringY });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMouseMove);

    // Magnetic on interactive elements
    const onEnter = () => {
      gsap.to(ring, { scale: 1.6, opacity: 0.8, duration: 0.3 });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const interactives = document.querySelectorAll('a, button, .about__keyword');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
