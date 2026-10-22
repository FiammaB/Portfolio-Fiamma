import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Descripción', type: 'localeText' }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Los números más bajos aparecen primero.',
      type: 'number',
    }),
  ],
  orderings: [{ title: 'Orden manual', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title.es', subtitle: 'description.es' } },
});
