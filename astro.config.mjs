import { defineConfig } from 'astro/config';

export default defineConfig({
  // Cambiar si más adelante se usa un dominio propio
  site: 'https://fiamma-brizuela.netlify.app',
  // El CSS va dentro del HTML: evita pedidos que bloquean el primer pintado
  build: {
    inlineStylesheets: 'always',
  },
  image: {
    domains: ['cdn.sanity.io'],
  },
});
