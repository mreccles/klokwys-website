// Scroll reveal
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

// Count-up numbers when visible
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = Array.from(document.querySelectorAll(".count"));
  if (counters.length === 0) return;

  const format = (val, decimals) =>
    val.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";

    const target = parseFloat(el.dataset.target || "0");
    const start = parseFloat(el.dataset.start ?? "0");
    const duration = parseInt(el.dataset.duration || "1200", 10);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";

    if (prefersReduced || duration <= 0 || start === target) {
      el.textContent = prefix + format(target, decimals) + suffix;
      return;
    }

    const t0 = performance.now();
    function tick(t) {
      const p = Math.min((t - t0) / duration, 1);
      const val = start + (target - start) * p;
      el.textContent = prefix + format(val, decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCount);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  counters.forEach(el => io.observe(el));
})();

// Footer year
const y = document.getElementById("y");
if (y) y.textContent = new Date().getFullYear();