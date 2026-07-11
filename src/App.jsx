import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css'

function App() {
  useEffect(() => {
    let refreshTimer;
    const refresh = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    const imageCheck = () => {
      const imgs = document.querySelectorAll('img');
      let loaded = 0;
      const total = imgs.length;
      if (total === 0) { refresh(); return; }
      imgs.forEach(img => {
        if (img.complete) {
          loaded++;
          if (loaded === total) refresh();
        } else {
          img.addEventListener('load', () => {
            loaded++;
            if (loaded === total) refresh();
          }, { once: true });
        }
      });
    };

    window.addEventListener('load', imageCheck);
    window.addEventListener('resize', refresh);
    window.addEventListener('orientationchange', refresh);

    return () => {
      window.removeEventListener('load', imageCheck);
      window.removeEventListener('resize', refresh);
      window.removeEventListener('orientationchange', refresh);
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Home />
    </>
  )
}

export default App
