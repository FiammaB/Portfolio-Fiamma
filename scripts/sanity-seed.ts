/**
 * Genera studio/seed.ndjson con todo el contenido de src/lib/seed.ts (español
 * e inglés) para importarlo en Sanity. Las imágenes y los CV se suben solos
 * desde public/.
 *
 *   npx tsx scripts/sanity-seed.ts
 *   cd studio && npx sanity dataset import seed.ndjson production --missing
 *
 * Con --missing solo se crean los documentos que todavía no existen: no pisa
 * lo que ya se haya editado en el panel. (--replace los sobrescribe.)
 */
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { seed } from '../src/lib/seed';
import type { Image } from '../src/lib/types';

const root = resolve(import.meta.dirname, '..');
const es = seed('es');
const en = seed('en');
let keyCount = 0;
const key = () => `k${(keyCount++).toString(36).padStart(4, '0')}`;

const asset = (kind: 'image' | 'file', publicPath: string) =>
  `${kind}@${pathToFileURL(join(root, 'public', publicPath)).href}`;

// Imagen local (/img/...) → campo de imagen de Sanity con subida automática
const image = (img: Image | null) =>
  img ? { _type: 'image', _sanityAsset: asset('image', img.url), ...(img.alt ? { alt: img.alt } : {}) } : undefined;

const file = (path: string) => ({ _type: 'file', _sanityAsset: asset('file', path) });

// Campos traducibles: { es, en } a partir de las dos versiones del seed
const loc = (a: string, b: string) => ({ _type: 'localeString', es: a, en: b });
const text = (a: string, b: string) => ({ _type: 'localeText', es: a, en: b });
const list = (a: string[], b: string[]) => ({ _type: 'localeStringList', es: a, en: b });

const TONES: Record<string, string> = { '#7C5CFF': 'violeta', '#FF8A5B': 'naranja', '#F3F0FF': 'claro' };

const docs: Record<string, unknown>[] = [];

es.projects.forEach((p, i) => {
  const e = en.projects[i];
  docs.push({
    _id: `project-${i + 1}`,
    _type: 'project',
    title: loc(p.title, e.title),
    kind: loc(p.kind, e.kind),
    tone: p.tone,
    categories: p.categories,
    description: text(p.description, e.description),
    stack: loc(p.stack, e.stack),
    image: image(p.image),
    placeholder: p.placeholder,
    ...(p.domain ? { domain: p.domain } : {}),
    ...(p.url ? { url: p.url } : {}),
    cta: loc(p.cta, e.cta),
    order: (i + 1) * 10,
  });
});

es.services.forEach((s, i) => {
  const e = en.services[i];
  docs.push({
    _id: `service-${i + 1}`,
    _type: 'service',
    title: loc(s.title, e.title),
    description: text(s.description, e.description),
    order: (i + 1) * 10,
  });
});

const s = es.settings;
const t = en.settings;
docs.push({
  _id: 'settings',
  _type: 'settings',
  name: s.name,
  role: loc(s.role, t.role),
  availability: loc(s.availability, t.availability),
  typedWords: list(s.typedWords, t.typedWords),
  heroCopy: text(s.heroCopy, t.heroCopy),
  shots: s.shots.map((sh) => ({ _key: key(), _type: 'shot', image: image(sh.image), tone: TONES[sh.ring] ?? 'violeta' })),
  features: s.features.map((f, i) => ({
    _key: key(),
    _type: 'feature',
    title: loc(f.title, t.features[i].title),
    stack: f.stack,
    souxion: Boolean(f.souxion),
  })),
  marquee: s.marquee,
  aboutPhoto: image(s.aboutPhoto),
  aboutLead: text(s.aboutLead, t.aboutLead),
  aboutCopy: text(s.aboutCopy, t.aboutCopy),
  traits: list(s.traits, t.traits),
  stats: s.stats.map((st, i) => ({ _key: key(), _type: 'stat', value: st.value, label: loc(st.label, t.stats[i].label), tone: st.tone })),
  souxionDescription: text(s.souxion.description, t.souxion.description),
  souxionPhoto: image(s.souxion.photo),
  souxionUrl: s.souxion.url,
  souxionInstagram: s.souxion.instagram,
  souxionWhatsapp: s.souxion.whatsapp,
  stack: s.stack.map((c, i) => ({ _key: key(), _type: 'stackCategory', label: loc(c.label, t.stack[i].label), items: c.items })),
  education: s.education.map((ed, i) => ({
    _key: key(),
    _type: 'educationItem',
    year: ed.year,
    title: loc(ed.title, t.education[i].title),
    institution: ed.institution,
  })),
  certificates: s.certificates.map((c, i) => ({
    _key: key(),
    _type: 'certificate',
    title: loc(c.title, t.certificates[i].title),
    issuer: c.issuer,
    image: image(c.image),
  })),
  email: s.email,
  whatsapp: s.whatsapp,
  whatsappMessage: loc(s.whatsappMessage, t.whatsappMessage),
  linkedin: s.linkedin,
  github: s.github,
  cvEs: file(s.cvEs),
  cvEn: file(s.cvEn),
});

const out = join(root, 'studio', 'seed.ndjson');
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join('\n') + '\n');
console.log(`${docs.length} documentos → ${out}`);
