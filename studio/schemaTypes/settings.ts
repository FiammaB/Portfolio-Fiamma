import { defineArrayMember, defineField, defineType } from 'sanity';
import { imageWithAlt } from './image';

export const settings = defineType({
  name: 'settings',
  title: 'Datos generales',
  type: 'document',
  groups: [
    { name: 'portada', title: 'Portada', default: true },
    { name: 'sobre', title: 'Sobre mí' },
    { name: 'souxion', title: 'SOUXION' },
    { name: 'stack', title: 'Stack' },
    { name: 'formacion', title: 'Formación' },
    { name: 'contacto', title: 'Contacto' },
  ],
  fields: [
    // ---------- Portada ----------
    defineField({ name: 'name', title: 'Nombre', type: 'string', group: 'portada' }),
    defineField({ name: 'role', title: 'Rol', description: 'Ej: Desarrolladora Full Stack', type: 'localeString', group: 'portada' }),
    defineField({
      name: 'availability',
      title: 'Disponibilidad',
      description: 'La píldora con el punto verde.',
      type: 'localeString',
      group: 'portada',
    }),
    defineField({
      name: 'typedWords',
      title: 'Frases que se escriben solas',
      description: 'Completan "creo …". Ej: interfaces responsive y mantenibles',
      type: 'localeStringList',
      group: 'portada',
    }),
    defineField({
      name: 'heroCopy',
      title: 'Presentación',
      description: 'La palabra SOUXION se convierte sola en link a la sección del estudio.',
      type: 'localeText',
      group: 'portada',
    }),
    defineField({
      name: 'shots',
      title: 'Fotos del carrusel',
      description: 'Verticales (4:5), idealmente 900×1125. Cada una tiñe el resplandor de fondo.',
      type: 'array',
      group: 'portada',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'shot',
          fields: [
            imageWithAlt('image', 'Foto'),
            defineField({
              name: 'tone',
              title: 'Color del resplandor',
              type: 'string',
              initialValue: 'violeta',
              options: { list: ['violeta', 'naranja', 'claro'], layout: 'radio', direction: 'horizontal' },
            }),
          ],
          preview: { select: { media: 'image', title: 'image.alt', subtitle: 'tone' } },
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Especialidades (#01 – #04)',
      type: 'array',
      group: 'portada',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({ name: 'title', title: 'Título', type: 'localeString' }),
            defineField({ name: 'stack', title: 'Tecnologías', type: 'string' }),
            defineField({ name: 'souxion', title: 'Numeral en naranja (SOUXION)', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 'title.es', subtitle: 'stack' } },
        }),
      ],
    }),
    defineField({
      name: 'marquee',
      title: 'Cinta violeta',
      description: 'Las palabras que se desplazan debajo de la portada.',
      type: 'array',
      group: 'portada',
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ---------- Sobre mí ----------
    imageWithAlt('aboutPhoto', 'Foto', 'Vertical (4:5).', 'sobre'),
    defineField({ name: 'aboutLead', title: 'Párrafo principal', type: 'localeText', group: 'sobre' }),
    defineField({ name: 'aboutCopy', title: 'Segundo párrafo', type: 'localeText', group: 'sobre' }),
    defineField({ name: 'traits', title: 'Cualidades', type: 'localeStringList', group: 'sobre' }),
    defineField({
      name: 'stats',
      title: 'Burbujas de datos',
      type: 'array',
      group: 'sobre',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', title: 'Número', description: 'Ej: 20+', type: 'string' }),
            defineField({ name: 'label', title: 'Texto', type: 'localeString' }),
            defineField({
              name: 'tone',
              title: 'Estilo',
              type: 'string',
              initialValue: 'accent',
              options: {
                list: [
                  { title: 'Violeta', value: 'accent' },
                  { title: 'Borde', value: 'outline' },
                  { title: 'Naranja', value: 'orange' },
                ],
              },
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label.es' } },
        }),
      ],
    }),

    // ---------- SOUXION ----------
    defineField({ name: 'souxionDescription', title: 'Descripción', type: 'localeText', group: 'souxion' }),
    imageWithAlt('souxionPhoto', 'Foto del collage', undefined, 'souxion'),
    defineField({ name: 'souxionUrl', title: 'Sitio del estudio', type: 'url', group: 'souxion' }),
    defineField({ name: 'souxionInstagram', title: 'Instagram', description: 'Ej: @souxi.on', type: 'string', group: 'souxion' }),
    defineField({
      name: 'souxionWhatsapp',
      title: 'WhatsApp del estudio',
      description: 'Con código de país, sin espacios. Ej: 5492611234567',
      type: 'string',
      group: 'souxion',
    }),

    // ---------- Stack ----------
    defineField({
      name: 'stack',
      title: 'Categorías',
      type: 'array',
      group: 'stack',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stackCategory',
          fields: [
            defineField({ name: 'label', title: 'Categoría', type: 'localeString' }),
            defineField({ name: 'items', title: 'Tecnologías', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
          preview: { select: { title: 'label.es', items: 'items' }, prepare: ({ title, items }) => ({ title, subtitle: items?.join(' · ') }) },
        }),
      ],
    }),

    // ---------- Formación ----------
    defineField({
      name: 'education',
      title: 'Estudios y cursos',
      type: 'array',
      group: 'formacion',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'educationItem',
          fields: [
            defineField({ name: 'year', title: 'Año o sigla', description: 'Ej: 2023, UTN', type: 'string' }),
            defineField({ name: 'title', title: 'Título', type: 'localeString' }),
            defineField({ name: 'institution', title: 'Institución', type: 'string' }),
          ],
          preview: { select: { title: 'title.es', subtitle: 'institution' } },
        }),
      ],
    }),
    defineField({
      name: 'certificates',
      title: 'Certificados',
      description: 'Se muestran al tocar "Ver certificados".',
      type: 'array',
      group: 'formacion',
      options: { layout: 'grid' },
      of: [
        defineArrayMember({
          type: 'object',
          name: 'certificate',
          fields: [
            defineField({ name: 'title', title: 'Curso', type: 'localeString' }),
            defineField({ name: 'issuer', title: 'Institución', type: 'string' }),
            imageWithAlt('image', 'Imagen del certificado'),
          ],
          preview: { select: { title: 'title.es', subtitle: 'issuer', media: 'image' } },
        }),
      ],
    }),

    // ---------- Contacto ----------
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contacto' }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      description: 'Con código de país, sin espacios. Ej: 5492611234567',
      type: 'string',
      group: 'contacto',
    }),
    defineField({ name: 'whatsappMessage', title: 'Mensaje inicial de WhatsApp', type: 'localeString', group: 'contacto' }),
    defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url', group: 'contacto' }),
    defineField({ name: 'github', title: 'GitHub', type: 'url', group: 'contacto' }),
    defineField({ name: 'cvEs', title: 'CV en español (PDF)', type: 'file', options: { accept: 'application/pdf' }, group: 'contacto' }),
    defineField({ name: 'cvEn', title: 'CV en inglés (PDF)', type: 'file', options: { accept: 'application/pdf' }, group: 'contacto' }),
  ],
  preview: { prepare: () => ({ title: 'Datos generales' }) },
});
