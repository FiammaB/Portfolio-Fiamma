// Efectos suaves atados al scroll. Todo se recalcula una vez por frame y se
// escribe como variables CSS o clases (sin tocar el layout).
//
//  - Servicios: cada título ([data-fill]) se pinta de blanco de izquierda a derecha.
//  - Sobre mí: las palabras del título y del párrafo ([data-words]) aparecen o
//    se encienden al bajar,
//    la foto ([data-parallax]) se desliza dentro del marco y las burbujas
//    ([data-countup]) cuentan desde cero al aparecer.
//  - SOUXION: el título aparece por palabras, el logo se pinta ([data-fill]),
//    el collage ([data-collage]) tiene profundidad y la marca de agua
//    ([data-drift]) se corre de costado.
//
// Con movimiento reducido todo queda en su estado final, sin animar.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (v: number) => Math.min(1, Math.max(0, v));

const titles = [...document.querySelectorAll<HTMLElement>('[data-fill]')];
const paragraphs = [...document.querySelectorAll<HTMLElement>('[data-words]')].map((el) => ({
  el,
  words: [...el.querySelectorAll<HTMLElement>('.w')],
}));
const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
const collages = [...document.querySelectorAll<HTMLElement>('[data-collage]')];
const drifts = [...document.querySelectorAll<HTMLElement>('[data-drift]')];

function update() {
  const h = window.innerHeight;
  const still = reduced.matches;

  titles.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    // 0 cuando el título asoma por abajo (88% del alto), 1 al llegar al 46%
    const f = still ? 1 : clamp((h * 0.88 - top) / (h * 0.42));
    el.style.setProperty('--fill', `${(f * 100).toFixed(1)}%`);
  });

  paragraphs.forEach(({ el, words }) => {
    const r = el.getBoundingClientRect();
    // Título: aparece entre que asoma (90% del alto) y llega al 60%.
    // Párrafo: empieza al asomar (85%) y termina cuando su final llega a la mitad.
    const short = el.dataset.words === 'title';
    const range = short ? h * 0.3 : h * 0.35 + r.height;
    const start = short ? h * 0.9 : h * 0.85;
    const p = still ? 1 : clamp((start - r.top) / range);
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
  });

  parallax.forEach((img) => {
    const r = (img.parentElement ?? img).getBoundingClientRect();
    // -1 cuando el marco entra por abajo, 1 cuando sale por arriba
    const p = still ? 0 : clamp((h - r.top) / (h + r.height)) * 2 - 1;
    img.style.setProperty('--py', `${(p * -5).toFixed(2)}%`);
  });

  // SOUXION: piezas del collage a distintas velocidades y la foto que se endereza
  collages.forEach((el) => {
    const r = el.getBoundingClientRect();
    const cp = still ? 0 : clamp((h - r.top) / (h + r.height)) * 2 - 1;
    const cs = still ? 1 : clamp((h * 0.95 - r.top) / (h * 0.6));
    el.style.setProperty('--cp', cp.toFixed(3));
    el.style.setProperty('--cs', cs.toFixed(3));
  });

  // SOUXION: la marca de agua gigante se corre hacia la izquierda al bajar
  drifts.forEach((el) => {
    const r = (el.parentElement ?? el).getBoundingClientRect();
    const p = still ? 0 : clamp((h - r.top) / (h + r.height));
    el.style.setProperty('--drift', `${(-p * 420).toFixed(1)}px`);
  });
}

let ticking = false;
function request() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    update();
  });
}

if (titles.length || paragraphs.length || parallax.length || collages.length || drifts.length) {
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  reduced.addEventListener('change', update);
  update();
}

// ---------- Contadores de las burbujas ----------
function count(el: HTMLElement) {
  const target = Number(el.dataset.countup);
  const suffix = el.dataset.suffix ?? '';
  const width = Number(el.dataset.pad ?? 1);
  const duration = 1200;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = `${String(Math.round(target * eased)).padStart(width, '0')}${suffix}`;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counters = [...document.querySelectorAll<HTMLElement>('[data-countup]')];
if (counters.length && !reduced.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        count(entry.target as HTMLElement);
      });
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => observer.observe(el));
}

// Módulo propio: sus variables no se mezclan con las de otros scripts
export {};
