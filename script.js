// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  // Responsiveness for dynamic scaling and layout adjustments
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
  });

  resizeObserver.observe(document.body);

  // Reveal year blocks on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate number for year
        const yearEl = entry.target.querySelector(".year");
        const targetYear = +yearEl.dataset.year;
        let current = 0;

        const counter = setInterval(() => {
          if (current < targetYear) {
            current += Math.ceil((targetYear - current) / 10);
            yearEl.textContent = current;
          } else {
            yearEl.textContent = targetYear;
            clearInterval(counter);
          }
        }, 30);
      }
    });
  }, {
    threshold: 0.4
  });

  document.querySelectorAll(".year-block").forEach(block => observer.observe(block));

  // Device pixel ratio optimization
  const dpr = window.devicePixelRatio || 1;
  if (dpr > 1) {
    document.body.classList.add("high-dpi");
  }
});
