// Interacciones de las secciones: pestañas (SOUXION y Stack, con avance
// automático opcional), filtros y vista previa de proyectos, y link activo de la navegación.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Pestañas accesibles ----------
// Cualquier [data-tabs] con un [role=tablist] y paneles vinculados por aria-controls
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((group) => {
  const tabs = [...group.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const vertical = group.querySelector('[role="tablist"]')?.getAttribute('aria-orientation') === 'vertical';

  function select(tab: HTMLButtonElement, focus = false) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    group.dispatchEvent(new CustomEvent('tabchange', { detail: tab }));
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const next = vertical ? 'ArrowDown' : 'ArrowRight';
      const prev = vertical ? 'ArrowUp' : 'ArrowLeft';
      let target: number | null = null;
      if (e.key === next) target = (i + 1) % tabs.length;
      if (e.key === prev) target = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') target = 0;
      if (e.key === 'End') target = tabs.length - 1;
      if (target === null) return;
      e.preventDefault();
      select(tabs[target], true);
    });
  });

  // Avance automático ([data-autoplay]=ms): solo mientras el grupo se ve. Si la
  // persona toca, usa el teclado o enfoca una pestaña, se detiene para siempre.
  const delay = Number(group.dataset.autoplay);
  if (!delay || reduced) return;
  const bar = group.querySelector<HTMLElement>('.tab-progress');
  group.style.setProperty('--autoplay', `${delay}ms`);
  let stopped = false;
  let visible = false;
  let timer = 0;

  const current = () => tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
  function schedule() {
    clearTimeout(timer);
    bar?.classList.remove('is-running');
    if (stopped || !visible || document.hidden) return;
    void bar?.offsetWidth; // reinicia la animación de la barrita
    bar?.classList.add('is-running');
    timer = window.setTimeout(() => {
      select(tabs[(current() + 1) % tabs.length]);
      schedule();
    }, delay);
  }
  function stop() {
    if (stopped) return;
    stopped = true;
    clearTimeout(timer);
    bar?.classList.remove('is-running');
    bar?.classList.add('is-stopped');
  }

  const list = group.querySelector('[role="tablist"]');
  ['pointerdown', 'keydown', 'focusin'].forEach((type) => list?.addEventListener(type, stop));
  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    },
    { threshold: 0.4 },
  ).observe(group);
  document.addEventListener('visibilitychange', schedule);
});

// ---------- Anillo del stack: cantidad y nombre de la categoría elegida ----------
const stack = document.querySelector<HTMLElement>('[data-stack]');
stack?.addEventListener('tabchange', (e) => {
  const tab = (e as CustomEvent<HTMLButtonElement>).detail;
  const count = stack.querySelector('[data-ring-count]');
  const label = stack.querySelector('[data-ring-label]');
  if (count) count.textContent = tab.dataset.count ?? '';
  if (label) label.textContent = tab.dataset.label ?? '';
});

// ---------- Lo que hago: la barra toma el color del área elegida ----------
const areas = document.querySelector<HTMLElement>('[data-areas]');
areas?.addEventListener('tabchange', (e) => {
  const tab = (e as CustomEvent<HTMLButtonElement>).detail;
  areas.style.setProperty('--side', tab.dataset.side ?? '');
  areas.classList.toggle('is-soux', tab.dataset.soux === 'true');
});

// ---------- Proyectos: filtros ----------
const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const rows = [...document.querySelectorAll<HTMLElement>('[data-projects] > li')];
const projectCount = document.querySelector('[data-project-count]');
const pad2 = (n: number) => String(n).padStart(2, '0');

filters.forEach((button) =>
  button.addEventListener('click', () => {
    const id = button.dataset.filter!;
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    const visible = rows.filter((row) => id === 'todos' || row.dataset.cats?.split(' ').includes(id));
    rows.forEach((row) => {
      row.hidden = !visible.includes(row);
    });
    visible.forEach((row, i) => {
      const num = row.querySelector('[data-num]');
      if (num) num.textContent = pad2(i + 1);
    });
    if (projectCount) projectCount.textContent = pad2(visible.length);
  }),
);

// ---------- Proyectos: vista previa que sigue al mouse ----------
const plist = document.querySelector<HTMLElement>('[data-plist]');
const preview = plist?.querySelector<HTMLElement>('[data-preview]');

if (plist && preview) {
  const cards = [...preview.querySelectorAll<HTMLElement>('[data-card]')];
  const canPreview = window.matchMedia('(hover: hover) and (min-width: 761px)');
  let shown = false;
  let frame = 0;
  let lastX = 0;
  let settle = 0;
  let pointerX = 0;
  let pointerY = 0;

  // Se ubica al lado del punto; si no entra a la derecha, pasa a la izquierda
  function place(x: number, y: number) {
    const w = preview!.offsetWidth;
    const h = preview!.offsetHeight;
    const left = x + 32 + w > plist!.offsetWidth + 24 ? x - w - 32 : x + 32;
    const top = Math.max(-40, Math.min(y - 150, plist!.offsetHeight - h + 40));
    preview!.style.setProperty('--px', `${Math.round(left)}px`);
    preview!.style.setProperty('--py', `${Math.round(top)}px`);
    plist!.style.setProperty('--mx', `${Math.round(x)}px`);
    plist!.style.setProperty('--my', `${Math.round(y)}px`);
  }

  function show(row: HTMLElement, x: number, y: number) {
    if (!canPreview.matches) return;
    cards.forEach((c) => c.classList.toggle('is-on', c.dataset.card === row.dataset.row));
    plist!.dataset.tone = row.dataset.tone;
    if (shown) return;
    // Al aparecer va directo al lugar, sin cruzar la lista desde donde quedó
    preview!.style.transition = 'none';
    place(x, y);
    void preview!.offsetWidth;
    preview!.style.transition = '';
    shown = true;
    lastX = x;
    plist!.classList.add('is-previewing');
  }

  function hide() {
    shown = false;
    plist!.classList.remove('is-previewing');
  }

  plist.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'mouse') return;
    const row = (e.target as HTMLElement).closest<HTMLElement>('[data-row]');
    if (!row) return;
    const r = plist.getBoundingClientRect();
    show(row, e.clientX - r.left, e.clientY - r.top);
  });

  plist.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    pointerX = e.clientX;
    pointerY = e.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!shown) return;
      const r = plist.getBoundingClientRect();
      const x = pointerX - r.left;
      place(x, pointerY - r.top);
      if (reduced) return;
      // Se inclina según la velocidad del mouse y al frenar vuelve a su lugar
      const tilt = Math.max(-9, Math.min(9, (x - lastX) * 0.45)) - 2;
      lastX = x;
      preview.style.setProperty('--pr', `${tilt.toFixed(1)}deg`);
      clearTimeout(settle);
      settle = window.setTimeout(() => preview.style.removeProperty('--pr'), 140);
    });
  });

  plist.addEventListener('pointerleave', hide);

  // Con teclado aparece junto a la fila enfocada
  plist.addEventListener('focusin', (e) => {
    const row = (e.target as HTMLElement).closest<HTMLElement>('[data-row]');
    if (!row || !row.matches(':focus-visible')) return;
    const r = plist.getBoundingClientRect();
    const rr = row.getBoundingClientRect();
    hide();
    show(row, r.width * 0.42, rr.top - r.top + rr.height / 2);
  });
  plist.addEventListener('focusout', hide);

  filters.forEach((b) => b.addEventListener('click', hide));
}

// ---------- Link activo de la navegación ----------
const navlinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-navlink]')];
const sections = navlinks
  .map((a) => document.querySelector<HTMLElement>(a.getAttribute('href')!))
  .filter(Boolean) as HTMLElement[];

const spy = new IntersectionObserver(
  (entries) => {
    entries
      .filter((e) => e.isIntersecting)
      .forEach((e) => {
        navlinks.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === `#${e.target.id}`));
      });
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
sections.forEach((s) => spy.observe(s));
