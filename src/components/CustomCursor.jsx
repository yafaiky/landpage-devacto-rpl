import { useEffect, useRef } from 'react';

const hasFinePointer = typeof window !== "undefined" && window.matchMedia('(pointer: fine)').matches;

const isLowEnd = (() => {
  if (typeof navigator === "undefined") return false;
  const ram = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency || 4;
  return (ram && ram <= 2) || cores <= 2;
})();

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

if (!hasFinePointer || isLowEnd || isMobile) {
  // Skip rendering
}

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!hasFinePointer || isLowEnd || isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;
    let isRunning = true;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const lerp = (s, e, t) => s + (e - s) * t;

    const tick = () => {
      if (!isRunning) return;
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onEnter = () => {
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1.6)`;
      ring.style.opacity = '0.8';
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(0.5)`;
    };
    const onLeave = () => {
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(1)`;
      ring.style.opacity = '0.5';
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
    };

    const interactives = document.querySelectorAll('a, button, .about__keyword');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      isRunning = false;
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  if (!hasFinePointer || isLowEnd || isMobile) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
