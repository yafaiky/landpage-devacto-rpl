import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { newsData } from '../data/content.js';

import BeritaCard from './BeritaCard';
import getExcerpt from '../utils/getExcerpt';
import scrambleText from '../utils/scrambleText';

gsap.registerPlugin(ScrollTrigger);

export default function Berita() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleText = 'Berita Terkini';

  const [news, setNews] = useState(newsData);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://xxx.c8nayrntn2.qzz.io/blog/api/posts');
        if (!response.ok) throw new Error('Terjadi kesalahan pada jaringan');

        const json = await response.json();

        const apiNews = json.data.slice(0, 3).map(post => ({
          id: post.id,
          slug: post.slug,
          category: post.Category?.name || 'Umum',
          title: post.title.trim(),
          excerpt: getExcerpt(post.content),
          image: '/banner.webp',
          author: post.User?.username || 'admin'
        }));

        setNews(apiNews);
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    };

    fetchNews();
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      if (titleRef.current) titleRef.current.textContent = titleText;
      return;
    }

    let scrambleCleanup;

    const st = ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (titleRef.current) {
          scrambleCleanup = scrambleText(titleRef.current, titleText);
        }
      },
    });

    gsap.from('.berita__card', {
      opacity: 0,
      y: 60,
      scale: 0.96,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.berita__grid',
        start: 'top 85%',
        once: true
      }
    });

    return () => {
      st.kill();

      if (scrambleCleanup) scrambleCleanup();

      ScrollTrigger.getAll().forEach(t => {
        if (section.contains(t.trigger)) t.kill();
      });
    };
  }, {
    scope: sectionRef,
    dependencies: [news],
    revertOnUpdate: true
  });

  return (
    <section id="berita" className="berita section" ref={sectionRef}>
      <div className="berita__container section__container">
        <div className="section__header">
          <div className="section__badge">Update</div>

          <h2 className="berita__title" ref={titleRef}>
            &nbsp;
          </h2>

          <p className="section__subtitle">
            Ikuti perkembangan terbaru dari Devacctto — mulai dari workshop, prestasi, hingga rekrutmen anggota baru.
          </p>
        </div>

        <div className="berita__grid">
          {news.map((item, idx) => (
            <BeritaCard
              key={item.id}
              item={item}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}