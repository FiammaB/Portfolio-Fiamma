import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Dirección del panel publicado: https://fiamma-brizuela.sanity.studio
  studioHost: 'fiamma-brizuela',
});
