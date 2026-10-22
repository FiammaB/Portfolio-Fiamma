# Portfolio de Fiamma Brizuela

Sitio en [Astro](https://astro.build) con contenido editable desde [Sanity](https://www.sanity.io), en español (`/`) e inglés (`/en/`). Se publica en Netlify.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run check      # revisa tipos
```

Sin Sanity configurado, el sitio usa el contenido de `src/lib/seed.ts`. Funciona igual, solo que para cambiar textos hay que editar ese archivo.

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Contenido (proyectos, servicios, bio, stack, formación, contacto) | Sanity, o `src/lib/seed.ts` como respaldo |
| Textos fijos de la interfaz (títulos de sección, botones) | `src/lib/ui.ts` |
| Código del editor animado de la portada | `src/lib/editor.ts` |
| Secciones | `src/components/*.astro` |
| Interacciones (pestañas, filtros, carrusel, consulta) | `src/scripts/*.ts` |
| Colores y tipografías | `src/styles/global.css` |

## Conectar Sanity

1. Crear un proyecto en [sanity.io/manage](https://www.sanity.io/manage) y copiar su **Project ID**.
2. Copiar `.env.example` a `.env` y `studio/.env.example` a `studio/.env`, y completar el ID en los dos.
3. Cargar el contenido actual en Sanity (incluye fotos, certificados y los dos CV):

   ```bash
   npx tsx scripts/sanity-seed.ts
   cd studio
   npm install
   npx sanity dataset import seed.ndjson production --missing
   ```

4. Abrir el panel: `cd studio && npm run dev`. Para publicarlo en `fiamma-brizuela.sanity.studio`: `npm run deploy`.
5. En Netlify, agregar `PUBLIC_SANITY_PROJECT_ID` y `PUBLIC_SANITY_DATASET` como variables de entorno.

Cada texto traducible tiene un campo **Español** y uno **English**. Si el inglés queda vacío, se muestra el español.

El sitio es estático: después de editar en Sanity hay que volver a publicar en Netlify. Se puede automatizar con un *build hook* de Netlify conectado a un webhook de Sanity.
