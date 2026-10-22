import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Portfolio Fiamma',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.documentTypeListItem('project').title('Proyectos'),
            S.documentTypeListItem('service').title('Servicios'),
            S.divider(),
            // Documento único: portada, sobre mí, SOUXION, stack, formación y contacto
            S.listItem()
              .title('Datos generales')
              .child(S.document().schemaType('settings').documentId('settings')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // "Datos generales" es único: no se puede crear otro desde el botón "+"
    templates: (templates) => templates.filter((t) => t.schemaType !== 'settings'),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === 'settings' ? actions.filter((a) => !['duplicate', 'delete'].includes(a.action ?? '')) : actions,
  },
});
