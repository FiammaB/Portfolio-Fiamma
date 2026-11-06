/**
 * Genera los CV en PDF (public/cv/) a partir de los textos de este archivo.
 *
 *   node scripts/cv/cv.mjs
 *
 * Usa Microsoft Edge para imprimir el HTML. Si está en otra ruta, indicala
 * con la variable de entorno EDGE_PATH.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const edge = process.env.EDGE_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const contact = [
  { label: 'brizuelafiamma6@gmail.com', href: 'mailto:brizuelafiamma6@gmail.com' },
  { label: '+54 9 261 680 1745', href: 'https://wa.me/5492616801745' },
  { label: 'portfolio-fiamma-brizuela.netlify.app', href: 'https://portfolio-fiamma-brizuela.netlify.app/' },
  { label: 'linkedin.com/in/fiamma-brizuela-16195224b', href: 'https://www.linkedin.com/in/fiamma-brizuela-16195224b' },
  { label: 'github.com/FiammaB', href: 'https://github.com/FiammaB' },
];

const tools = {
  stack: ['Java', 'JavaScript', 'TypeScript', 'PHP', 'SQL', 'HTML', 'CSS'],
  frontend: ['React', 'Vite', 'Tailwind CSS', 'Bootstrap'],
  backend: ['Spring Boot', 'Node.js', 'Express.js', 'MySQL'],
  tools: ['Git', 'GitHub', 'Docker', 'Figma', 'Thunder Client', 'npm'],
  ai: ['Claude Code', 'Codex'],
};

const content = {
  es: {
    file: 'fiamma-brizuela-cv-es.pdf',
    title: 'CV de Fiamma Brizuela, desarrolladora full stack',
    role: 'Desarrolladora Full Stack',
    profileTitle: 'Perfil',
    profile:
      'Egresada de la Tecnicatura en Programación de la UTN y co-fundadora del estudio SOUXION. Desarrollo aplicaciones y sitios web con Java, Spring Boot, React y TypeScript, cuidando la experiencia de usuario y el diseño responsive. Busco oportunidades para seguir creciendo como desarrolladora.',
    experienceTitle: 'Experiencia y proyectos',
    experience: [
      {
        name: 'SOUXION',
        role: 'Co-fundadora · Desarrollo web',
        date: 'Actualidad',
        link: { label: 'souxion.com.ar', href: 'https://souxion.com.ar/' },
        points: [
          'Estudio creativo de diseño y desarrollo web para marcas, emprendimientos y profesionales de LATAM y Europa.',
          'Desarrollo sitios a medida en conjunto con la diseñadora del estudio, desde la idea hasta la publicación.',
        ],
      },
      {
        name: 'Mondial Inmobiliaria',
        role: 'Frontend',
        date: '11/2024 – 01/2025',
        link: { label: 'mondialinmobiliaria.com', href: 'https://mondialinmobiliaria.com/' },
        points: [
          'Sitio web para una inmobiliaria de España, con foco en la experiencia de usuario y el diseño responsive.',
          'Catálogo de propiedades con carrusel y vista de detalle, blog de noticias y formulario de contacto.',
        ],
        stack: 'React 18 · Vite · Tailwind CSS',
      },
      {
        name: 'El Buen Sabor',
        role: 'Full Stack · App de delivery de comida',
        date: '04/2024 – 07/2025',
        points: [
          'Aplicación de una sola página con autenticación JWT, roles de usuario y catálogo de productos y promociones.',
          'Carrito persistente, checkout en varios pasos e integración con Mercado Pago.',
          'Paneles de administración con control de stock, gestión de clientes y búsqueda por palabra clave.',
        ],
        stack: 'React · TypeScript · Tailwind CSS · Java · Spring Boot',
      },
      {
        name: 'Tienda de Instrumentos Musicales',
        role: 'Full Stack · Proyecto unipersonal',
        date: '04/2025 – 05/2025',
        link: { label: 'Ver repositorio', href: 'https://github.com/FiammaB/Tp5LabInstrumentosSpringBoot' },
        points: [
          'E-commerce con gestión (CRUD) de instrumentos, carritos y pedidos, y simulación de pago con Mercado Pago.',
          'Autenticación y autorización por roles, con vistas dinámicas según los privilegios de cada usuario.',
          'Módulo de estadísticas con gráficos y exportación de datos a Excel y PDF.',
        ],
        stack: 'Java · Spring Boot · MySQL · React · Vite · TypeScript',
      },
    ],
    educationTitle: 'Educación',
    education: [
      { name: 'Tecnicatura Universitaria en Programación', place: 'Universidad Tecnológica Nacional', date: '2023 – 07/2025' },
    ],
    coursesTitle: 'Cursos',
    courses: [
      { name: 'Programación en Java', place: 'Mendoza Futura Digital', date: '2023' },
      { name: 'Photoshop · Inkscape · Marketing Digital', place: 'Casa del Futuro', date: '2021' },
    ],
    skillsTitle: 'Habilidades técnicas',
    groups: { stack: 'Lenguajes', frontend: 'Frontend', backend: 'Backend y datos', tools: 'Herramientas', ai: 'Asistentes de IA' },
    softTitle: 'Habilidades blandas',
    soft: ['Proactiva', 'Responsable', 'Eficiente', 'Comunicación efectiva', 'Pensamiento crítico'],
  },
  en: {
    file: 'fiamma-brizuela-cv-en.pdf',
    title: 'Resume of Fiamma Brizuela, full stack developer',
    role: 'Full Stack Developer',
    profileTitle: 'Profile',
    profile:
      'Programming graduate from UTN and co-founder of the SOUXION studio. I build web applications and websites with Java, Spring Boot, React and TypeScript, with a focus on user experience and responsive design. I am looking for opportunities to keep growing as a developer.',
    experienceTitle: 'Experience and projects',
    experience: [
      {
        name: 'SOUXION',
        role: 'Co-founder · Web development',
        date: 'Present',
        link: { label: 'souxion.com.ar', href: 'https://souxion.com.ar/' },
        points: [
          'Creative web design and development studio for brands, businesses and professionals in LATAM and Europe.',
          "I build custom websites together with the studio's designer, from the first idea to launch.",
        ],
      },
      {
        name: 'Mondial Inmobiliaria',
        role: 'Frontend',
        date: '11/2024 – 01/2025',
        link: { label: 'mondialinmobiliaria.com', href: 'https://mondialinmobiliaria.com/' },
        points: [
          'Website for a real estate agency in Spain, focused on user experience and responsive design.',
          'Property catalog with carousels and detail views, news blog and contact form.',
        ],
        stack: 'React 18 · Vite · Tailwind CSS',
      },
      {
        name: 'El Buen Sabor',
        role: 'Full Stack · Food delivery app',
        date: '04/2024 – 07/2025',
        points: [
          'Single page application with JWT authentication, user roles and a catalog of products and promotions.',
          'Persistent shopping cart, multi-step checkout and Mercado Pago integration.',
          'Admin panels with stock control, client management and keyword search.',
        ],
        stack: 'React · TypeScript · Tailwind CSS · Java · Spring Boot',
      },
      {
        name: 'Musical Instrument Online Store',
        role: 'Full Stack · Solo project',
        date: '04/2025 – 05/2025',
        link: { label: 'View repository', href: 'https://github.com/FiammaB/Tp5LabInstrumentosSpringBoot' },
        points: [
          'E-commerce with full CRUD for instruments, carts and orders, plus a Mercado Pago payment simulation.',
          'Role-based authentication and authorization, with dynamic views based on user privileges.',
          'Statistics module with charts and data export to Excel and PDF.',
        ],
        stack: 'Java · Spring Boot · MySQL · React · Vite · TypeScript',
      },
    ],
    educationTitle: 'Education',
    education: [
      { name: 'University Technical Degree in Programming', place: 'Universidad Tecnológica Nacional (UTN)', date: '2023 – 07/2025' },
    ],
    coursesTitle: 'Courses',
    courses: [
      { name: 'Java Programming', place: 'Mendoza Futura Digital', date: '2023' },
      { name: 'Photoshop · Inkscape · Digital Marketing', place: 'Casa del Futuro', date: '2021' },
    ],
    skillsTitle: 'Technical skills',
    groups: { stack: 'Languages', frontend: 'Frontend', backend: 'Backend and data', tools: 'Tools', ai: 'AI assistants' },
    softTitle: 'Soft skills',
    soft: ['Proactive', 'Responsible', 'Efficient', 'Effective communication', 'Critical thinking'],
  },
};

const css = `
@font-face { font-family: 'Geist'; src: url('../../public/fonts/geist-latin.woff2') format('woff2'); font-weight: 300 600; }
@font-face { font-family: 'Geist Mono'; src: url('../../public/fonts/geist-mono-latin.woff2') format('woff2'); font-weight: 400 500; }
@font-face { font-family: 'Syne'; src: url('../../public/fonts/syne-latin.woff2') format('woff2'); font-weight: 700 800; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 210mm; height: 297mm; }
body {
  font-family: 'Geist', Arial, sans-serif; font-size: 9.5pt; line-height: 1.44; color: #2b2738; background: #fff;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
a { color: inherit; text-decoration: none; }
.head {
  display: flex; align-items: center; gap: 7mm; padding: 11mm 14mm 9mm; background: #120d20; color: #f3f0ff;
}
.photo { flex: none; width: 29mm; height: 29mm; border-radius: 50%; object-fit: cover; border: 0.7mm solid #8d71ff; }
h1 { font-family: 'Syne', 'Geist', sans-serif; font-weight: 800; font-size: 25pt; line-height: 1; letter-spacing: -0.02em; }
.role { margin-top: 1.6mm; font-family: 'Geist Mono', monospace; font-size: 10pt; color: #c4b5ff; }
.contact { display: flex; flex-wrap: wrap; gap: 0.7mm 4.5mm; margin-top: 3.4mm; font-size: 8.4pt; color: #dcd4ff; }
.layout { display: grid; grid-template-columns: minmax(0, 1fr) 58mm; column-gap: 8mm; padding: 7.5mm 14mm 0; }
h2 {
  font-family: 'Geist Mono', monospace; font-weight: 500; font-size: 8.4pt; letter-spacing: 0.1em; text-transform: uppercase;
  color: #5a3fd6; padding-bottom: 1.2mm; margin-bottom: 2.6mm; border-bottom: 0.3mm solid #d9d3f2;
}
section + section { margin-top: 5.6mm; }
.profile { font-size: 9.6pt; line-height: 1.5; }
.job { break-inside: avoid; }
.job + .job { margin-top: 3.9mm; }
.job-top { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
h3 { font-size: 10.6pt; font-weight: 600; line-height: 1.25; color: #120d20; }
.date { flex: none; font-family: 'Geist Mono', monospace; font-size: 7.8pt; color: #5f5875; }
.job-sub { margin-top: 0.2mm; font-size: 8.8pt; color: #5f5875; }
.job-sub a { color: #5a3fd6; }
ul { list-style: none; }
.points { margin-top: 1.1mm; }
.points li { padding-left: 3mm; text-indent: -3mm; }
.points li + li { margin-top: 0.5mm; }
/* Viñeta en línea: si fuera position:absolute, el PDF guardaría estos textos al final y los lectores de CV los leerían desordenados */
.points li::before { content: ''; display: inline-block; width: 1.1mm; height: 1.1mm; margin-right: 1.9mm; vertical-align: 0.14em; border-radius: 50%; background: #7c5cff; }
.tech { margin-top: 1mm; font-family: 'Geist Mono', monospace; font-size: 7.5pt; color: #5a3fd6; }
.entry + .entry { margin-top: 2.5mm; }
.entry strong { display: block; font-weight: 600; font-size: 9.4pt; line-height: 1.3; color: #120d20; }
.entry span { display: block; font-size: 8.6pt; color: #5f5875; }
.entry .date { margin-top: 0.3mm; }
.group + .group { margin-top: 2.2mm; }
.group-name { font-weight: 600; font-size: 8.8pt; color: #120d20; }
.group-items { font-size: 8.8pt; }
.soft li + li { margin-top: 0.4mm; }
`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const link = (l) => `<a href="${l.href}">${esc(l.label)}</a>`;

const html = (t) => `<!doctype html>
<html lang="${t === content.en ? 'en' : 'es'}">
<head><meta charset="utf-8"><title>${esc(t.title)}</title><style>${css}</style></head>
<body>
<header class="head">
  <img class="photo" src="foto.jpg" alt="">
  <div>
    <h1>Fiamma Brizuela</h1>
    <p class="role">${esc(t.role)}</p>
    <p class="contact">${contact.map(link).join('')}</p>
  </div>
</header>
<div class="layout">
  <main>
    <section><h2>${esc(t.profileTitle)}</h2><p class="profile">${esc(t.profile)}</p></section>
    <section>
      <h2>${esc(t.experienceTitle)}</h2>
      ${t.experience
        .map(
          (j) => `<article class="job">
        <div class="job-top"><h3>${esc(j.name)}</h3><span class="date">${esc(j.date)}</span></div>
        <p class="job-sub">${esc(j.role)}${j.link ? ` · ${link(j.link)}` : ''}</p>
        <ul class="points">${j.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        ${j.stack ? `<p class="tech">${esc(j.stack)}</p>` : ''}
      </article>`,
        )
        .join('')}
    </section>
  </main>
  <aside>
    <section>
      <h2>${esc(t.educationTitle)}</h2>
      ${t.education.map((e) => `<div class="entry"><strong>${esc(e.name)}</strong><span>${esc(e.place)}</span><span class="date">${esc(e.date)}</span></div>`).join('')}
    </section>
    <section>
      <h2>${esc(t.skillsTitle)}</h2>
      ${Object.entries(tools)
        .map(([k, items]) => `<div class="group"><p class="group-name">${esc(t.groups[k])}</p><p class="group-items">${items.map(esc).join(' · ')}</p></div>`)
        .join('')}
    </section>
    <section>
      <h2>${esc(t.softTitle)}</h2>
      <ul class="soft">${t.soft.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </section>
    <section>
      <h2>${esc(t.coursesTitle)}</h2>
      ${t.courses.map((e) => `<div class="entry"><strong>${esc(e.name)}</strong><span>${esc(e.place)}</span><span class="date">${esc(e.date)}</span></div>`).join('')}
    </section>
  </aside>
</div>
</body>
</html>`;

// Con OUT_DIR se generan en otra carpeta, para revisarlos sin pisar los publicados
const outDir = resolve(process.env.OUT_DIR ?? join(root, 'public', 'cv'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Edge en Windows devuelve el control antes de terminar: se espera a que el PDF
// exista y deje de crecer. Se escribe aparte para no perder el anterior si falla.
async function waitForFile(path) {
  let last = -1;
  for (let i = 0; i < 120; i++) {
    await sleep(500);
    const size = existsSync(path) ? statSync(path).size : -1;
    if (size > 0 && size === last) return;
    last = size;
  }
  throw new Error(`Edge no generó ${path}`);
}

for (const t of Object.values(content)) {
  const page = join(here, `.tmp-${t.file}.html`);
  const pdf = join(here, `.tmp-${t.file}`);
  writeFileSync(page, html(t));
  const result = spawnSync(
    edge,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-pdf-header-footer',
      `--user-data-dir=${join(here, '.tmp-edge')}`,
      `--print-to-pdf=${pdf}`,
      pathToFileURL(page).href,
    ],
    { stdio: 'ignore' },
  );
  if (result.error) throw result.error;
  await waitForFile(pdf);
  renameSync(pdf, join(outDir, t.file));
  rmSync(page, { force: true });
  console.log(`${t.file} generado en ${outDir}`);
}
await sleep(1500);
rmSync(join(here, '.tmp-edge'), { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
