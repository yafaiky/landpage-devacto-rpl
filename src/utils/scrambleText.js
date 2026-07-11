function scrambleText(el, finalText, callback) {
  if (!el) return;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  let frame = 0;
  let raf;
  const total = 20;

  const animate = () => {
    if (frame >= total) {
      el.textContent = finalText;
      if (callback) callback();
      return;
    }

    const progress = frame / total;

    el.textContent = finalText
      .split('')
      .map((c, i) => {
        if (c === ' ') return ' ';
        if (i < progress * finalText.length) return c;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    frame++;
    raf = requestAnimationFrame(animate);
  };

  animate();

  return () => cancelAnimationFrame(raf);
}

export default scrambleText;