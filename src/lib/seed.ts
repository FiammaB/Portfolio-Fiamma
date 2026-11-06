// Contenido tomado de la maqueta y del portfolio anterior. Se usa cuando Sanity
// todavía no tiene datos cargados: cada campo o colección vacía cae a lo que hay acá.
import type { Image, Lang, Project, Service, Settings } from './types';

const img = (name: string, alt: string, width: number, height: number): Image => ({
  url: `/img/${name}.webp`,
  alt,
  width,
  height,
});

export function seed(lang: Lang) {
  const t = (es: string, en: string) => (lang === 'es' ? es : en);

  const settings: Settings = {
    name: 'Fiamma Brizuela',
    role: t('Desarrolladora Full Stack', 'Full Stack Developer'),
    availability: t(
      'Disponible para proyectos y oportunidades · Argentina',
      'Available for projects and opportunities · Argentina',
    ),
    heroCopy: t(
      'Técnica en Desarrollo de Software y co-fundadora de SOUXION. Trabajo con Java, React, TypeScript, Node.js y Spring Boot para crear productos web funcionales, responsive y enfocados en una buena experiencia de usuario.',
      "Software Development graduate and co-founder of SOUXION. I work with Java, React, TypeScript, Node.js and Spring Boot to build functional, responsive web products focused on a great user experience.",
    ),
    typedWords:
      lang === 'es'
        ? ['interfaces responsive y mantenibles', 'APIs y lógica de negocio', 'sitios web a medida', 'buenas experiencias de usuario']
        : ['responsive, maintainable interfaces', 'APIs and business logic', 'custom websites', 'good user experiences'],
    shots: [
      {
        image: img('fiamma-buzo', t('Fiamma Brizuela con buzo gris sobre fondo oscuro', 'Fiamma Brizuela in a grey sweatshirt on a dark background'), 900, 1125),
        glow: 'rgba(124,92,255,.30)',
        ring: '#7C5CFF',
      },
      {
        image: img('fiamma-rojo', t('Fiamma Brizuela con saco negro sobre fondo rojo y naranja', 'Fiamma Brizuela in a black blazer on a red and orange background'), 900, 1599),
        glow: 'rgba(255,90,50,.30)',
        ring: '#FF8A5B',
      },
      {
        image: img('fiamma-anteojos', t('Fiamma Brizuela sosteniendo anteojos de sol', 'Fiamma Brizuela holding sunglasses'), 900, 1125),
        glow: 'rgba(220,214,255,.20)',
        ring: '#F3F0FF',
      },
    ],
    features: [
      { label: 'Frontend', title: t('Interfaces responsive', 'Responsive interfaces'), stack: 'React · TypeScript · Tailwind CSS' },
      { label: 'Backend', title: t('APIs y lógica de negocio', 'APIs and business logic'), stack: 'Java · Spring Boot · Node.js' },
      { label: t('Datos', 'Data'), title: t('Bases de datos', 'Databases'), stack: 'SQL · MySQL Workbench' },
      { label: 'SOUXION', title: t('Sitios web con SOUXION', 'Websites with SOUXION'), stack: t('Diseño UX/UI · Desarrollo a medida', 'UX/UI design · Custom development'), souxion: true },
    ],
    aboutLead: t(
      'Soy egresada de la Tecnicatura en Desarrollo de Software de la Universidad Tecnológica Nacional, con experiencia en proyectos académicos y proyectos reales publicados. Además, soy una de las creadoras de SOUXION, donde diseño y desarrollo sitios web a medida.',
      "I graduated from the Software Development program at Universidad Tecnológica Nacional, with experience in academic work and published real-world projects. I'm also one of the founders of SOUXION, where I design and build custom websites.",
    ),
    aboutCopy: t(
      'Me destaco por combinar aprendizaje rápido, buena comunicación, trabajo en equipo y foco en entregar soluciones claras. Busco seguir creciendo como desarrolladora y aportar valor desde el producto, la implementación y la experiencia del usuario.',
      "I stand out for combining fast learning, clear communication, teamwork and a focus on delivering clear solutions. I want to keep growing as a developer and add value through product thinking, implementation and user experience.",
    ),
    traits:
      lang === 'es'
        ? ['Aprendizaje rápido', 'Buena comunicación', 'Trabajo en equipo', 'Soluciones claras']
        : ['Fast learner', 'Clear communication', 'Teamwork', 'Clear solutions'],
    aboutPhoto: img('fiamma-sentada', t('Fiamma Brizuela sentada con traje negro', 'Fiamma Brizuela sitting in a black suit'), 900, 1125),
    stats: [
      { value: '20+', label: t('tecnologías y herramientas', 'technologies and tools'), tone: 'accent' },
      { value: '04', label: t('certificados', 'certificates'), tone: 'outline' },
      { value: '01', label: t('estudio co-fundado', 'co-founded studio'), tone: 'orange' },
    ],
    souxion: {
      description: t(
        'Soy una de las creadoras de SOUXION, un estudio creativo de diseño y desarrollo web para marcas, emprendimientos y profesionales. Diseñamos y desarrollamos sitios web únicos, pensados para cada marca.',
        "I'm one of the founders of SOUXION, a creative web design and development studio for brands, businesses and professionals. We design and build unique websites, made for each brand.",
      ),
      photo: img('fiamma-rojo', t('Fiamma Brizuela, co-fundadora de SOUXION', 'Fiamma Brizuela, co-founder of SOUXION'), 900, 1599),
      url: 'https://souxion.com.ar/',
      instagram: '@souxi.on',
      instagramUrl: 'https://www.instagram.com/souxi.on/',
      whatsapp: '5492617616147',
    },
    email: 'brizuelafiamma6@gmail.com',
    // Formato internacional para WhatsApp: 54 (Argentina) + 9 (celular) + 261 6801745
    whatsapp: '5492616801745',
    whatsappMessage: t('¡Hola Fiamma! Vi tu portfolio y quería hablar con vos.', 'Hi Fiamma! I saw your portfolio and wanted to get in touch.'),
    linkedin: 'https://www.linkedin.com/in/fiamma-brizuela-16195224b',
    github: 'https://github.com/FiammaB',
    cvEs: '/cv/fiamma-brizuela-cv-es.pdf',
    cvEn: '/cv/fiamma-brizuela-cv-en.pdf',
    stack: [
      { label: t('Lenguajes', 'Languages'), items: ['HTML', 'CSS', 'JavaScript', 'Java', 'TypeScript', 'PHP', 'SQL'] },
      { label: t('Frameworks y librerías', 'Frameworks and libraries'), items: ['React', 'Vite', 'Node.js', 'Express.js', 'Spring Boot', 'Bootstrap', 'Tailwind CSS'] },
      { label: t('Herramientas', 'Tools'), items: ['Git', 'GitHub', 'npm', 'Docker', 'MySQL Workbench', 'Figma', 'Thunder Client'] },
    ],
    education: [
      { year: 'UTN', title: t('Tecnicatura en Desarrollo de Software', 'Software Development degree'), institution: 'Universidad Tecnológica Nacional' },
      { year: '2023', title: t('Programación en Java', 'Java programming'), institution: 'Mendoza Futura Digital' },
      { year: '2021', title: 'Photoshop · Inkscape · Marketing Digital', institution: 'Casa del Futuro' },
    ],
    certificates: [
      { title: 'Java', issuer: 'Mendoza Futura Digital', image: img('cert-java', t('Certificado de Java', 'Java certificate'), 1400, 990) },
      { title: 'Photoshop', issuer: 'Casa del Futuro', image: img('cert-photoshop', t('Certificado de Photoshop', 'Photoshop certificate'), 1400, 990) },
      { title: 'Inkscape', issuer: 'Casa del Futuro', image: img('cert-inkscape', t('Certificado de Inkscape', 'Inkscape certificate'), 1400, 990) },
      { title: t('Marketing Digital', 'Digital Marketing'), issuer: 'Casa del Futuro', image: img('cert-marketing', t('Certificado de Marketing Digital', 'Digital Marketing certificate'), 1400, 990) },
    ],
  };

  const projects: Project[] = [
    {
      title: t('Sitio web de SOUXION', 'SOUXION website'),
      kind: 'SOUXION',
      tone: 'souxion',
      categories: ['souxion', 'web'],
      description: t(
        'El sitio del estudio: presenta los servicios de diseño y desarrollo web, los tipos de sitio, el proceso de trabajo en cuatro etapas, el portafolio y los planes, con contacto directo por WhatsApp.',
        "The studio's website: it presents the web design and development services, the types of sites, the four-step process, the portfolio and the plans, with direct contact via WhatsApp.",
      ),
      stack: t('Diseño UX/UI · Desarrollo web', 'UX/UI design · Web development'),
      image: img('souxion-sitio', t('Sitio web de SOUXION', 'SOUXION website'), 1400, 710),
      placeholder: 'souxion',
      cta: t('Visitar souxion.com.ar', 'Visit souxion.com.ar'),
      url: 'https://souxion.com.ar/',
    },
    {
      title: 'Umang Agarwal',
      kind: 'SOUXION',
      tone: 'souxion',
      categories: ['souxion', 'web'],
      description: t('Sitio web publicado, parte del portafolio de SOUXION.', "Published website, part of SOUXION's portfolio."),
      stack: t('Desarrollo web · SOUXION', 'Web development · SOUXION'),
      image: img('umang-agarwal', t('Sitio de Umang Agarwal', 'Umang Agarwal website'), 1400, 718),
      placeholder: 'web',
      domain: 'umang-agarwal.netlify.app',
      cta: t('Ver sitio', 'Visit site'),
      url: 'https://umang-agarwal.netlify.app/',
    },
    {
      title: 'Unlink Travel',
      kind: 'SOUXION',
      tone: 'souxion',
      categories: ['souxion', 'web'],
      description: t('Sitio web publicado, parte del portafolio de SOUXION.', "Published website, part of SOUXION's portfolio."),
      stack: t('Desarrollo web · SOUXION', 'Web development · SOUXION'),
      image: img('unlink-travel', t('Sitio de Unlink Travel', 'Unlink Travel website'), 1400, 688),
      placeholder: 'web',
      domain: 'unlink-travel.netlify.app',
      cta: t('Ver sitio', 'Visit site'),
      url: 'https://unlink-travel.netlify.app/',
    },
    {
      title: t('Portfolio de Carolina Leiva', "Carolina Leiva's portfolio"),
      kind: 'Portfolio',
      tone: 'accent',
      categories: ['souxion', 'portfolio', 'web'],
      description: t(
        'Portfolio de la diseñadora gráfica Carolina Leiva: branding, diseño web, UX/UI y contenido digital, con una estética editorial y de collage.',
        'Portfolio for graphic designer Carolina Leiva: branding, web design, UX/UI and digital content, with an editorial, collage-like look.',
      ),
      stack: t('Diseño UX/UI · Desarrollo web', 'UX/UI design · Web development'),
      image: img('portfolio-carolina', t('Portfolio de Carolina Leiva', "Carolina Leiva's portfolio"), 1400, 661),
      placeholder: 'web',
      domain: 'portfolio-carolina-leiva.netlify.app',
      cta: t('Ver sitio', 'Visit site'),
      url: 'https://portfolio-carolina-leiva.netlify.app/',
    },
    {
      title: 'Mondial Inmobiliaria',
      kind: t('Proyecto real', 'Real project'),
      tone: 'accent',
      categories: ['web'],
      description: t(
        'Desarrollo de una plataforma inmobiliaria profesional con catálogo dinámico, filtros de búsqueda, carruseles de imágenes y diseño responsive. El objetivo fue presentar propiedades de forma clara y facilitar la exploración del usuario.',
        'A professional real estate platform with a dynamic property catalog, search filters, image carousels and responsive design. The goal was to present listings clearly and make exploring them easy.',
      ),
      stack: 'React 18 · Vite · Tailwind CSS',
      image: img('mondial', t('Sitio de Mondial Inmobiliaria', 'Mondial Inmobiliaria website'), 1600, 858),
      placeholder: 'web',
      cta: t('Ver sitio', 'Visit site'),
      url: 'https://mondialinmobiliaria.com/',
    },
    {
      title: 'Colibria Paisajismo',
      kind: 'SOUXION',
      tone: 'souxion',
      categories: ['souxion', 'web'],
      description: t(
        'Sitio web para Colibria, estudio de paisajismo en Mendoza. Proyecto de SOUXION.',
        'Website for Colibria, a landscape design studio in Mendoza. A SOUXION project.',
      ),
      stack: t('Desarrollo web · SOUXION', 'Web development · SOUXION'),
      image: img('colibria', t('Portada del sitio de Colibria Paisajismo', 'Colibria Paisajismo website'), 1400, 930),
      placeholder: 'web',
      domain: 'colibria.netlify.app',
      cta: t('Ver sitio', 'Visit site'),
      url: 'https://colibria.netlify.app/',
    },
    {
      title: 'KÜVA Arquitectura',
      kind: 'SOUXION',
      tone: 'souxion',
      categories: ['souxion', 'web'],
      description: t(
        'Sitio web para KÜVA, estudio de arquitectura. Proyecto de SOUXION.',
        'Website for KÜVA, an architecture studio. A SOUXION project.',
      ),
      stack: t('Desarrollo web · SOUXION', 'Web development · SOUXION'),
      image: img('kuva', t('Portada del sitio de KÜVA Arquitectura', 'KÜVA Arquitectura website'), 1400, 709),
      placeholder: 'web',
      domain: 'kuvarquitectura.com.ar',
      cta: t('Ver sitio', 'Visit site'),
      url: 'https://kuvarquitectura.com.ar/',
    },
  ];

  const services: Service[] = [
    { title: 'Landing pages', description: t('Landing o one page a medida, responsive y pensada para convertir.', 'Custom landing or one-page sites, responsive and built to convert.') },
    { title: t('Sitios corporativos', 'Business websites'), description: t('Varias páginas con navegación completa y diseño UX/UI personalizado.', 'Multiple pages with full navigation and custom UX/UI design.') },
    { title: 'Portfolios', description: t('Para mostrar tu trabajo de forma clara y con identidad propia.', 'To show your work clearly and with an identity of its own.') },
    { title: t('Tiendas online', 'Online stores'), description: t('Catálogos y tiendas adaptables a cualquier dispositivo.', 'Catalogs and stores that work on any device.') },
    { title: t('Apps web', 'Web apps'), description: t('Full stack: React en el frontend, Spring Boot o Node.js en el backend, con base de datos.', 'Full stack: React on the frontend, Spring Boot or Node.js on the backend, with a database.') },
  ];

  return { settings, projects, services };
}
