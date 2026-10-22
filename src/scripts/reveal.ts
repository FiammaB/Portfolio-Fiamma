// Marca como visibles los elementos [data-reveal] cuando entran al viewport.
// Los que aparecen juntos se escalonan con --reveal-index.
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');

const observer = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry, index) => {
        const el = entry.target as HTMLElement;
        el.style.setProperty('--reveal-index', String(index));
        el.classList.add('is-visible');
        observer.unobserve(el);
      });
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
);

items.forEach((el) => observer.observe(el));
