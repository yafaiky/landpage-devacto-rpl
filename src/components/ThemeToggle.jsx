import { useState, useEffect } from 'react';
import { IoFlashlight, IoFlashlightOutline } from "react-icons/io5";
import gsap from 'gsap';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    gsap.fromTo('.theme-btn-icon',
      { scale: 0.5, rotation: -90 },
      { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="navbar__theme-toggle"
      aria-label="Toggle theme"
    >
      <span>
        {isDark
          ? <IoFlashlight className="text-yellow-400" />
          : <IoFlashlightOutline />
        }
      </span>
    </button>
  );
}
