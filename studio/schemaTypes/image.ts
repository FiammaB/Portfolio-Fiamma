import { defineField } from 'sanity';

// Imagen con recorte y texto alternativo, compartida por todos los esquemas
export const imageWithAlt = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name,
    title,
    description,
    group,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Texto alternativo',
        description: 'Describe la imagen para lectores de pantalla y buscadores.',
        type: 'string',
      }),
    ],
  });
