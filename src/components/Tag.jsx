import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tagData } from '../data/content.js';
import { 
  SiPhp, SiMysql, SiLaravel, SiPython, SiCplusplus, 
  SiVuedotjs, SiGit, SiLinux, SiDocker, SiFigma, 
  SiKotlin, SiFirebase, SiBootstrap, SiTailwindcss, SiNodedotjs 
} from 'react-icons/si';
import { FaJava, FaPenNib, FaServer } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  "PHP": <SiPhp />,
  "MySQL": <SiMysql />,
  "Laravel": <SiLaravel />,
  "Java": <FaJava />,
  "Python": <SiPython />,
  "C++": <SiCplusplus />,
  "Vue": <SiVuedotjs />,
  "Git": <SiGit />,
  "Linux": <SiLinux />,
  "Docker": <SiDocker />,
  "UI/UX": <FaPenNib />,
  "Figma": <SiFigma />,
  "Kotlin": <SiKotlin />,
  "Firebase": <SiFirebase />,
  "REST API": <FaServer />,
  "Bootstrap": <SiBootstrap />,
  "Tailwind": <SiTailwindcss />,
  "Node.js": <SiNodedotjs />
};

export default function Tag() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.from('.tag__pill', {
        opacity: 0, y: 30, duration: 0.8,
        stagger: { amount: 0.8, from: 'random' },
        ease: 'back.out(1.4)',
        immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top 85%' }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tag" className="tag section section--grey" ref={sectionRef}>
      <div className="tag__container">
        <div className="section__header">
          <div className="section__badge">
            <span className="section__badge-dot" />
            Teknologi
          </div>
          <h2 className="tag__title section__title">Stack &amp; Tools</h2>
          <p className="section__subtitle">
            Teknologi yang dikuasai dan digunakan oleh anggota Devacctto dalam proyek nyata.
          </p>
        </div>

        <div className="tag__cloud">
          {tagData.map((tag) => (
            <button key={tag} className="tag__pill flex items-center gap-2">
              <span className="text-[1.1rem] opacity-80">{iconMap[tag]}</span>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}