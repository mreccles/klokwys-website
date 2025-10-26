// Scroll reveal using IntersectionObserver
(function () {
  const els = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

// Footer year
const y = document.getElementById("y");
if (y) y.textContent = new Date().getFullYear();