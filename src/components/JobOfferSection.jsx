import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    title: "Standard",
    num: "01",
    price: "$5k",
    period: "/bulan",
    tag: "Untuk tim kecil",
    desc: "Layanan standar dengan tim dedicated untuk proyek Anda. Cocok untuk startup yang butuh gerak cepat.",
    features: [
      "1 Dedicated Developer",
      "Weekly Updates",
      "Basic Support",
      "UI/UX Design",
    ],
  },
  {
    title: "Custom",
    num: "02",
    price: "Custom",
    period: "Quote",
    tag: "Enterprise",
    desc: "Solusi enterprise yang disesuaikan penuh dari konsepsi hingga rilis produk. Tim lengkap, hasil maksimal.",
    features: [
      "Full Development Team",
      "Daily Standups",
      "24/7 Priority Support",
      "Custom Architecture",
    ],
  },
  {
    title: "Audit",
    num: "03",
    price: "Flat Fee",
    period: "",
    tag: "One-time",
    desc: "Audit menyeluruh terhadap codebase, arsitektur, dan keamanan sistem Anda. Laporan detail dalam 2 minggu.",
    features: [
      "Code Quality Review",
      "Security Audit",
      "Performance Check",
      "Detailed Report",
    ],
  },
];

const JobOfferSection = () => {
  const sectionRef = useRef();

  useGSAP(() => {
    // toArray mengikuti urutan DOM:
    // index 0 = cover (paling atas, flip pertama)
    // index 1 = Standard, index 2 = Custom, index 3 = Audit
    const pages = gsap.utils.toArray(".book__leaf");
    const total = pages.length;
    const SCROLL_PER_FLIP = 900;

    // zIndex awal: cover paling tinggi, halaman terakhir paling rendah
    gsap.set(pages, {
      transformOrigin: "left center",
      rotationY: 0,
      z: 0,
      transformStyle: "preserve-3d",
    });
    pages.forEach((p, i) => gsap.set(p, { zIndex: total - i }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${total * SCROLL_PER_FLIP}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    pages.forEach((page, i) => {
      const at = i;
      tl.to(page, { z: 20, duration: 0.1, ease: "sine.in" }, at);
      tl.to(page, { rotationY: -180, duration: 0.8, ease: "power2.inOut" }, at + 0.05);
      tl.to(page, { z: 0, duration: 0.1, ease: "sine.out" }, at + 0.85);
      // setelah flip, turunkan zIndex supaya halaman berikutnya kelihatan
      tl.to(page, { zIndex: i + 1, duration: 0.01 }, at + 0.5);
    });
  }, { scope: sectionRef });

  return (
    <section className="joboffer" id="offer" ref={sectionRef}>

      <div className="joboffer__header">
        <h2 className="section__title joboffer__section-title">Pilih Paket Yang Tepat</h2>
        <p className="joboffer__hint-text">Scroll perlahan untuk membuka setiap halaman</p>
      </div>

      <p className="joboffer__hint">↓ scroll to turn pages</p>

      <div className="book__stage">

        <div className="book__spine">
          <span className="book__spine-text">Pricing · 2025</span>
        </div>

        <div className="book__shadow-page book__shadow-page--1" />
        <div className="book__shadow-page book__shadow-page--2" />
        <div className="book__shadow-page book__shadow-page--3" />

        <div className="book__final">
          <div className="book__final-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="book__final-title">Siap Memulai?</h3>
          <p className="book__final-desc">
            Mari wujudkan visi Anda bersama tim kami. Konsultasi pertama gratis, tanpa komitmen.
          </p>
          <button className="book__final-btn">Mulai Konsultasi</button>
        </div>

        <div className="book__leaf">
          <div className="book__cover-front">
            <div className="book__cover-ring book__cover-ring--1" />
            <div className="book__cover-ring book__cover-ring--2" />

            <div>
              <div className="book__cover-meta">
                <span className="book__cover-meta-text">Pricing Guide</span>
                <span className="book__cover-meta-text">2025</span>
              </div>
              <div className="book__cover-divider" />
            </div>

            <div>
              <p className="book__cover-eyebrow">Pilih Paket</p>
              <h1 className="book__cover-title">Yang Tepat<br />Untuk Anda</h1>
            </div>

            <div>
              <div className="book__cover-divider book__cover-divider--spaced" />
              <div className="book__cover-bottom">
                <div>
                  <p className="book__cover-count">{plans.length} Paket Tersedia</p>
                  <p className="book__cover-scroll-hint">Scroll perlahan untuk membuka →</p>
                </div>
                <div className="book__cover-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="book__cover-back">
            <span className="book__watermark book__watermark--cover">P</span>
          </div>
        </div>

        {[...plans].reverse().map((plan) => (
          <div className="book__leaf" key={plan.title}>

            <div className="book__face book__face--front">
              <div className="book__page-inner">

                <div className="book__page-top">
                  <span className="book__page-num">{plan.num}</span>
                  <span className="book__tag">{plan.tag}</span>
                </div>

                <h2 className="book__plan-title">{plan.title}</h2>
                <div className="book__price-row">
                  <span className="book__price">{plan.price}</span>
                  {plan.period && <span className="book__period">{plan.period}</span>}
                </div>

                <div className="book__rule" />

                <p className="book__desc">{plan.desc}</p>

                <p className="book__features-label">Yang Kamu Dapat</p>
                <ul className="book__features">
                  {plan.features.map((feat) => (
                    <li key={feat} className="book__feature">
                      <span className="book__feature-dot" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button className="book__cta">Pilih Paket →</button>
              </div>

              <div className="book__curl" />
            </div>

            <div className="book__face book__face--back">
              <div className="book__ruled-lines">
                {[...Array(14)].map((_, li) => (
                  <div key={li} className="book__ruled-line" />
                ))}
              </div>
              <span className="book__watermark">{plan.title}</span>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default JobOfferSection;