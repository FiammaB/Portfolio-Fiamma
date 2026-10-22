import { defineArrayMember, defineField, defineType } from 'sanity';
import { imageWithAlt } from './image';

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Etiqueta',
      description: 'La píldora de color: SOUXION, Proyecto real, UTN, En desarrollo…',
      type: 'localeString',
    }),
    defineField({
      name: 'tone',
      title: 'Color de la etiqueta',
      type: 'string',
      initialValue: 'muted',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Naranja (SOUXION)', value: 'souxion' },
          { title: 'Violeta', value: 'accent' },
          { title: 'Amarillo (en desarrollo)', value: 'dev' },
          { title: 'Borde (neutro)', value: 'muted' },
        ],
      },
    }),
    defineField({
      name: 'categories',
      title: 'Filtros donde aparece',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'grid',
        list: [
          { title: 'SOUXION', value: 'souxion' },
          { title: 'Sitios web', value: 'web' },
          { title: 'Portfolios', value: 'portfolio' },
          { title: 'Académicos', value: 'academico' },
        ],
      },
    }),
    defineField({ name: 'description', title: 'Descripción', type: 'localeText' }),
    defineField({
      name: 'stack',
      title: 'Tecnologías',
      description: 'Ej: React 18 · Vite · Tailwind CSS',
      type: 'localeString',
    }),
    imageWithAlt('image', 'Captura', 'Ideal: 1600×900 (16:9). Se muestra recortada desde arriba.'),
    defineField({
      name: 'placeholder',
      title: 'Si no hay captura, mostrar…',
      type: 'string',
      initialValue: 'web',
      hidden: ({ parent }) => Boolean(parent?.image?.asset),
      options: {
        list: [
          { title: 'Dominio sobre fondo naranja', value: 'web' },
          { title: 'Repositorio de GitHub', value: 'code' },
          { title: 'Logo de SOUXION', value: 'souxion' },
          { title: 'En desarrollo', value: 'soon' },
        ],
      },
    }),
    defineField({
      name: 'domain',
      title: 'Dominio a mostrar',
      description: 'Opcional. Si queda vacío se usa el link.',
      type: 'string',
      hidden: ({ parent }) => Boolean(parent?.image?.asset) || parent?.placeholder !== 'web',
    }),
    defineField({
      name: 'url',
      title: 'Link',
      description: 'Sitio publicado, demo o repositorio. Vacío = el botón se ve deshabilitado.',
      type: 'url',
    }),
    defineField({
      name: 'cta',
      title: 'Texto del botón',
      description: 'Ej: Ver sitio, Ver demo, Ver GitHub',
      type: 'localeString',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Los números más bajos aparecen primero.',
      type: 'number',
    }),
  ],
  orderings: [{ title: 'Orden manual', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title.es', subtitle: 'kind.es', media: 'image' },
  },
});
