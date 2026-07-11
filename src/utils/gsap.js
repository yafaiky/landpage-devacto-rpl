import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const isTouch = typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches;

export const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

export const isLowEnd = (() => {
  if (typeof navigator === 'undefined') return false;
  const ram = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency || 4;
  return (ram && ram <= 2) || cores <= 2;
})();

export const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const shouldAnimate = !isTouch && !prefersReducedMotion && !(isMobile && isLowEnd);

export default gsap;
