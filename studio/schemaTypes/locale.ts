import { defineArrayMember, defineField, defineType } from 'sanity';

// Campos traducibles: cada uno guarda { es, en }. El sitio usa el español
// cuando falta el inglés, así que alcanza con completar "es" para empezar.
const languages = [
  { id: 'es', title: 'Español' },
  { id: 'en', title: 'English' },
];

const options = { collapsible: true, collapsed: false, columns: 1 };

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto traducible',
  type: 'object',
  options,
  fields: languages.map((l) => defineField({ name: l.id, title: l.title, type: 'string' })),
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Párrafo traducible',
  type: 'object',
  options,
  fields: languages.map((l) => defineField({ name: l.id, title: l.title, type: 'text', rows: 4 })),
});

export const localeStringList = defineType({
  name: 'localeStringList',
  title: 'Lista traducible',
  type: 'object',
  options,
  fields: languages.map((l) =>
    defineField({
      name: l.id,
      title: l.title,
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ),
});
