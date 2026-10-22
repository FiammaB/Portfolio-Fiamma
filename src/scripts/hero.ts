// Portada: reloj, resplandor que sigue al mouse, texto que se escribe solo,
// carrusel de fotos y mini editor de código.
import { FILES, TOKEN_COLORS, type Token } from '@/lib/editor';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero = document.querySelector<HTMLElement>('[data-hero]');
const pad = (n: number) => String(n).padStart(2, '0');

// ---------- Reloj de Argentina ----------
const clock = document.querySelector<HTMLElement>('[data-clock]');
function updateClock() {
  if (!clock) return;
  const time = new Date().toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires',
  });
  clock.textContent = `ARG ${time}`;
}
updateClock();
setInterval(updateClock, 15000);

// ---------- Resplandor que sigue al mouse ----------
if (hero && !reduced) {
  let frame = 0;
  hero.addEventListener('pointermove', (e) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${Math.round(e.clientX - r.left)}px`);
      hero.style.setProperty('--my', `${Math.round(e.clientY - r.top)}px`);
    });
  });
}

// ---------- Texto que se escribe y se borra ----------
const typed = document.querySelector<HTMLElement>('[data-typed]');
if (typed && !reduced) {
  const words: string[] = JSON.parse(typed.dataset.words ?? '[]');
  let word = 0;
  let chars = words[0]?.length ?? 0;
  let deleting = true;
  let hold = 30;
  setInterval(() => {
    if (!words.length) return;
    if (hold > 0) return void hold--;
    const current = words[word];
    if (!deleting) {
      if (chars < current.length) chars++;
      else {
        deleting = true;
        hold = 22;
      }
    } else if (chars > 0) chars--;
    else {
      deleting = false;
      word = (word + 1) % words.length;
      hold = 4;
    }
    typed.textContent = words[word].slice(0, chars);
  }, 70);
}

// ---------- Carrusel de fotos ----------
const shots = [...document.querySelectorAll<HTMLImageElement>('[data-shot]')];
const pickers = [...document.querySelectorAll<HTMLButtonElement>('[data-pick-shot]')];
const counter = document.querySelector<HTMLElement>('[data-shot-counter]');
const glow = document.querySelector<HTMLElement>('[data-glow]');
let shot = 0;
let shotPinned = false;

function showShot(i: number) {
  shot = i;
  shots.forEach((img, n) => img.classList.toggle('is-active', n === i));
  pickers.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.pickShot) === i)));
  if (counter) counter.textContent = `${pad(i + 1)} / ${pad(shots.length)}`;
  if (glow && shots[i]) glow.style.setProperty('--glow', shots[i].dataset.glow ?? '');
}
pickers.forEach((b) =>
  b.addEventListener('click', () => {
    shotPinned = true;
    showShot(Number(b.dataset.pickShot));
  }),
);
if (shots.length > 1 && !reduced) {
  setInterval(() => {
    if (!shotPinned && !document.hidden) showShot((shot + 1) % shots.length);
  }, 6000);
}

// ---------- Mini editor ----------
const editor = document.querySelector<HTMLElement>('[data-editor]');
if (editor) {
  const tabs = [...editor.querySelectorAll<HTMLButtonElement>('[data-tab]')];
  const fileEl = editor.querySelector<HTMLElement>('[data-file]')!;
  const codeEl = editor.querySelector<HTMLElement>('[data-code]')!;
  const logsEl = editor.querySelector<HTMLElement>('[data-logs]')!;
  const statusEl = editor.querySelector<HTMLElement>('[data-status]')!;
  const runningLabel = editor.dataset.statusRunning ?? '●';
  const SPEED = 3;

  let tab = 1;
  let chars = 0;
  let logs = 0;
  let hold = 0;
  let pinned = false;

  const length = (code: Token[][]) => code.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

  const span = (text: string, kind: Token[1]) => {
    const el = document.createElement('span');
    el.style.color = TOKEN_COLORS[kind];
    el.textContent = text;
    return el;
  };

  function render() {
    const f = FILES[tab];
    let budget = chars;
    let caretPlaced = false;
    const lines = f.code.map((line, i) => {
      const row = document.createElement('div');
      row.className = 'line';
      const n = document.createElement('span');
      n.className = 'ln';
      n.textContent = String(i + 1);
      const body = document.createElement('span');
      line.forEach(([text, kind]) => {
        if (budget <= 0) return;
        const part = text.slice(0, budget);
        budget -= part.length;
        body.append(span(part, kind));
      });
      const lineDone = budget > 0;
      if (budget > 0) budget -= 1;
      if (!body.childNodes.length) body.textContent = ' ';
      if (!caretPlaced && (!lineDone || i === f.code.length - 1)) {
        caretPlaced = true;
        const caret = document.createElement('span');
        caret.className = 'caret';
        body.append(caret);
      }
      row.append(n, body);
      return row;
    });
    codeEl.replaceChildren(...lines);
    logsEl.replaceChildren(...f.logs.slice(0, logs).map(([text, kind]) => {
      const row = span(text, kind);
      row.style.display = 'block';
      return row;
    }));
    const running = logs > 0 && logs < f.logs.length;
    statusEl.textContent = running ? runningLabel : `${logs >= f.logs.length ? '✓' : '○'} ${f.status}`;
    fileEl.textContent = f.file;
    tabs.forEach((b) => b.setAttribute('aria-selected', String(Number(b.dataset.tab) === tab)));
  }

  function select(i: number) {
    tab = i;
    chars = 0;
    logs = 0;
    hold = 0;
    render();
  }

  tabs.forEach((b) =>
    b.addEventListener('click', () => {
      pinned = true;
      select(Number(b.dataset.tab));
      if (reduced) {
        chars = length(FILES[tab].code);
        logs = FILES[tab].logs.length;
        render();
      }
    }),
  );
  editor.querySelector('[data-run]')?.addEventListener('click', () => {
    pinned = true;
    chars = length(FILES[tab].code);
    logs = reduced ? FILES[tab].logs.length : 0;
    hold = 0;
    render();
  });

  if (!reduced) {
    // Arranca tipeando el primer archivo
    select(0);
    setInterval(() => {
      if (document.hidden) return;
      const f = FILES[tab];
      const total = length(f.code);
      if (chars < total) {
        chars = Math.min(total, chars + SPEED);
        return render();
      }
      if (logs < f.logs.length) {
        if (hold < 10) return void hold++;
        logs++;
        hold = 0;
        return render();
      }
      if (pinned) return;
      if (hold < 80) return void hold++;
      select((tab + 1) % FILES.length);
    }, 40);
  }
}
