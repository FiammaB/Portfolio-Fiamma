// Interacciones de las secciones: pestañas (SOUXION y Stack), filtros y
// acordeón de proyectos, y link activo de la navegación.

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

// ---------- Proyectos: filtros + acordeón ----------
const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const rows = [...document.querySelectorAll<HTMLElement>('[data-projects] > li')];

function setOpen(row: HTMLElement, open: boolean) {
  const button = row.querySelector<HTMLButtonElement>('[aria-expanded]');
  const detail = row.querySelector<HTMLElement>('[role="region"]');
  button?.setAttribute('aria-expanded', String(open));
  if (detail) detail.hidden = !open;
}

rows.forEach((row) => {
  row.querySelector('[aria-expanded]')?.addEventListener('click', () => {
    const wasOpen = row.querySelector('[aria-expanded]')?.getAttribute('aria-expanded') === 'true';
    rows.forEach((r) => setOpen(r, false));
    setOpen(row, !wasOpen);
  });
});

filters.forEach((button) =>
  button.addEventListener('click', () => {
    const id = button.dataset.filter!;
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    const visible = rows.filter((row) => id === 'todos' || row.dataset.cats?.split(' ').includes(id));
    rows.forEach((row) => {
      row.hidden = !visible.includes(row);
      setOpen(row, false);
    });
    // Renumera los visibles y abre el primero, como en la maqueta
    visible.forEach((row, i) => {
      const num = row.querySelector('[data-num]');
      if (num) num.textContent = `[${String(i + 1).padStart(2, '0')}]`;
    });
    if (visible[0]) setOpen(visible[0], true);
  }),
);

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
