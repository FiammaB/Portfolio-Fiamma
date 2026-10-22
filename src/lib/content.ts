// Única puerta de entrada al contenido. Las páginas importan desde acá y
// no saben si los datos vienen de Sanity o del contenido semilla local.
import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { seed } from './seed';
import type { Image, Lang, Project, Service, Settings, Shot } from './types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

const client = projectId
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false })
  : null;

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

type RawImage =
  | (SanityImageSource & { alt?: string; dimensions?: { width: number; height: number } })
  | null;

function image(raw: RawImage, fallbackAlt: string, width = 1600): Image | null {
  if (!raw || !builder) return null;
  const ratio = raw.dimensions ? raw.dimensions.height / raw.dimensions.width : undefined;
  const w = raw.dimensions ? Math.min(width, raw.dimensions.width) : width;
  return {
    url: builder.image(raw).width(w).auto('format').quality(82).url(),
    alt: raw.alt || fallbackAlt,
    width: w,
    height: ratio ? Math.round(w * ratio) : undefined,
  };
}

// Los textos traducibles se guardan como { es, en }; si falta el inglés se usa el español
const L = (field: string) => `"${field}": coalesce(${field}[$lang], ${field}.es)`;
const IMAGE = `{ ..., "dimensions": asset->metadata.dimensions }`;

async function fetch<T>(query: string, lang: Lang): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, { lang });
}

// Si el CMS todavía no tiene documentos de un tipo, se usa el contenido semilla
const orSeed = <T>(list: T[], fallback: T[]) => (list.length ? list : fallback);
const filled = <T>(value: T | undefined | null, fallback: T) =>
  value === undefined || value === null || value === '' ? fallback : value;

export async function getProjects(lang: Lang): Promise<Project[]> {
  const raw = await fetch<any[]>(
    `*[_type == "project"] | order(order asc, _createdAt asc) {
      ${L('title')}, ${L('kind')}, ${L('description')}, ${L('stack')}, ${L('cta')},
      tone, categories, placeholder, domain, url, image ${IMAGE}
    }`,
    lang,
  );
  const list = (raw ?? []).map(
    (p): Project => ({
      title: p.title,
      kind: p.kind ?? '',
      tone: p.tone ?? 'muted',
      categories: p.categories ?? [],
      description: p.description ?? '',
      stack: p.stack ?? '',
      image: image(p.image, p.title),
      placeholder: p.placeholder ?? 'web',
      domain: p.domain,
      cta: p.cta ?? '',
      url: p.url,
    }),
  );
  return orSeed(list, seed(lang).projects);
}

export async function getServices(lang: Lang): Promise<Service[]> {
  const raw = await fetch<Service[]>(
    `*[_type == "service"] | order(order asc) { ${L('title')}, ${L('description')} }`,
    lang,
  );
  return orSeed(raw ?? [], seed(lang).services);
}

const SHOT_TONES: Record<string, Pick<Shot, 'glow' | 'ring'>> = {
  violeta: { glow: 'rgba(124,92,255,.30)', ring: '#7C5CFF' },
  naranja: { glow: 'rgba(255,90,50,.30)', ring: '#FF8A5B' },
  claro: { glow: 'rgba(220,214,255,.20)', ring: '#F3F0FF' },
};

const settingsCache = new Map<Lang, Promise<Settings>>();

// Los campos vacíos en Sanity conservan el valor semilla
export function getSettings(lang: Lang): Promise<Settings> {
  if (!settingsCache.has(lang)) settingsCache.set(lang, loadSettings(lang));
  return settingsCache.get(lang)!;
}

async function loadSettings(lang: Lang): Promise<Settings> {
  const s = seed(lang).settings;
  const raw = await fetch<any>(
    `*[_type == "settings"][0] {
      name, marquee, email, whatsapp, linkedin, github,
      ${L('role')}, ${L('availability')}, ${L('heroCopy')}, ${L('typedWords')},
      ${L('aboutLead')}, ${L('aboutCopy')}, ${L('traits')}, ${L('whatsappMessage')},
      ${L('souxionDescription')}, souxionUrl, souxionInstagram, souxionWhatsapp,
      "cvEs": cvEs.asset->url, "cvEn": cvEn.asset->url,
      shots[] { tone, "image": image ${IMAGE} },
      aboutPhoto ${IMAGE}, souxionPhoto ${IMAGE},
      features[] { ${L('title')}, stack, souxion },
      stats[] { value, ${L('label')}, tone },
      stack[] { ${L('label')}, items },
      education[] { year, ${L('title')}, institution },
      certificates[] { ${L('title')}, issuer, "image": image ${IMAGE} }
    }`,
    lang,
  );
  if (!raw) return s;

  const shots = (raw.shots ?? [])
    .map((sh: any) => {
      const img = image(sh.image, s.name, 900);
      return img ? { image: img, ...(SHOT_TONES[sh.tone] ?? SHOT_TONES.violeta) } : null;
    })
    .filter(Boolean) as Shot[];
  const certificates = (raw.certificates ?? [])
    .map((c: any) => ({ title: c.title, issuer: c.issuer ?? '', image: image(c.image, c.title, 1400) }))
    .filter((c: any) => c.image);
  const list = <T>(value: T[] | undefined | null, fallback: T[]) => (value?.length ? value : fallback);

  return {
    name: filled(raw.name, s.name),
    role: filled(raw.role, s.role),
    availability: filled(raw.availability, s.availability),
    heroCopy: filled(raw.heroCopy, s.heroCopy),
    typedWords: list(raw.typedWords, s.typedWords),
    shots: orSeed(shots, s.shots),
    features: list(raw.features, s.features),
    marquee: list(raw.marquee, s.marquee),
    aboutLead: filled(raw.aboutLead, s.aboutLead),
    aboutCopy: filled(raw.aboutCopy, s.aboutCopy),
    traits: list(raw.traits, s.traits),
    aboutPhoto: image(raw.aboutPhoto, s.name, 900) ?? s.aboutPhoto,
    stats: list(raw.stats, s.stats),
    souxion: {
      description: filled(raw.souxionDescription, s.souxion.description),
      photo: image(raw.souxionPhoto, s.name, 800) ?? s.souxion.photo,
      url: filled(raw.souxionUrl, s.souxion.url),
      instagram: filled(raw.souxionInstagram, s.souxion.instagram),
      instagramUrl: raw.souxionInstagram
        ? `https://www.instagram.com/${raw.souxionInstagram.replace(/^@/, '')}/`
        : s.souxion.instagramUrl,
      whatsapp: filled(raw.souxionWhatsapp, s.souxion.whatsapp),
    },
    email: filled(raw.email, s.email),
    whatsapp: filled(raw.whatsapp, s.whatsapp),
    whatsappMessage: filled(raw.whatsappMessage, s.whatsappMessage),
    linkedin: filled(raw.linkedin, s.linkedin),
    github: filled(raw.github, s.github),
    cvEs: filled(raw.cvEs, s.cvEs),
    cvEn: filled(raw.cvEn, s.cvEn),
    stack: list(raw.stack, s.stack),
    education: list(raw.education, s.education),
    certificates: orSeed(certificates, s.certificates),
  };
}

export const whatsappUrl = (number: string, message?: string) =>
  `https://wa.me/${number.replace(/\D/g, '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
