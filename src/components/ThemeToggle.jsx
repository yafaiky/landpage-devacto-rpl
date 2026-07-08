import { useState, useEffect, useRef } from 'react';
import { IoFlashlight, IoFlashlightOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const btnRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    newTheme
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');

    const btn = btnRef.current;
    if (btn) {
      btn.style.transition = 'none';
      btn.style.transform = 'scale(0.75) rotate(-90deg)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          btn.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
          btn.style.transform = 'scale(1) rotate(0deg)';
        });
      });
    }
  };

  return (
    <button
      ref={btnRef}
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
