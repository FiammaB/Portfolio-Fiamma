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
      { title: t('Interfaces responsive', 'Responsive interfaces'), stack: 'React · TypeScript · Tailwind CSS' },
      { title: t('APIs y lógica de negocio', 'APIs and business logic'), stack: 'Java · Spring Boot · Node.js' },
      { title: t('Bases de datos', 'Databases'), stack: 'SQL · MySQL Workbench' },
      { title: t('Sitios web con SOUXION', 'Websites with SOUXION'), stack: t('Diseño UX/UI · Desarrollo a medida', 'UX/UI design · Custom development'), souxion: true },
    ],
    marquee: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Node.js', 'MySQL', t('Diseño UX/UI', 'UX/UI design'), 'SOUXION'],
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
      image: null,
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
      image: img('umang-agarwal', t('Sitio de Umang Agarwal', 'Umang Agarwal website'), 1600, 900),
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
      image: img('unlink-travel', t('Sitio de Unlink Travel', 'Unlink Travel website'), 1600, 900),
      placeholder: 'web',
      domain: 'unlink-travel.netlify.app',
      cta: t('Ver sitio', 'Visit site'),
      url: 'https://unlink-travel.netlify.app/',
    },
    {
      title: t('Portfolio de Carolina Leiva', "Carolina Leiva's portfolio"),
      kind: t('En desarrollo', 'In progress'),
      tone: 'dev',
      categories: ['portfolio', 'web'],
      description: t(
        'Portfolio de la diseñadora gráfica Carolina Leiva (cariz.studio): branding, diseño web, UX/UI y contenido digital, con una estética editorial y de collage. Lo estoy programando actualmente.',
        'Portfolio for graphic designer Carolina Leiva (cariz.studio): branding, web design, UX/UI and digital content, with an editorial, collage-like look. I am building it right now.',
      ),
      stack: 'Astro · Sanity',
      image: null,
      placeholder: 'soon',
      cta: t('Próximamente', 'Coming soon'),
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
      title: t('Portafolio personal', 'Personal portfolio'),
      kind: 'Portfolio',
      tone: 'accent',
      categories: ['portfolio'],
      description: t(
        'Mi portfolio anterior: presentación, stack, proyectos publicados y académicos, certificados y contacto, con versión en español e inglés.',
        'My previous portfolio: introduction, stack, published and academic projects, certificates and contact, in Spanish and English.',
      ),
      stack: t('Bilingüe ES / EN', 'Bilingual ES / EN'),
      image: img('portfolio-anterior', t('Portfolio anterior de Fiamma Brizuela', "Fiamma Brizuela's previous portfolio"), 1600, 900),
      placeholder: 'web',
      domain: 'fiammab.github.io/Portafolio',
      cta: t('Ver portfolio', 'View portfolio'),
      url: 'https://fiammab.github.io/Portafolio/',
    },
    {
      title: 'Fénix Lencería',
      kind: t('Proyecto personal', 'Personal project'),
      tone: 'muted',
      categories: ['web'],
      description: t(
        'Catálogo web de productos orientado a mostrar prendas de manera visual, ordenada y adaptable a múltiples dispositivos. Refleja mi interés por interfaces limpias y experiencias de compra claras.',
        'A product catalog built to showcase clothing in a visual, organized and multi-device way. It reflects my interest in clean interfaces and clear shopping experiences.',
      ),
      stack: 'React · TypeScript · Tailwind CSS',
      image: img('fenix', t('Catálogo de Fénix Lencería', 'Fénix Lencería catalog'), 1600, 860),
      placeholder: 'web',
      cta: t('Ver demo', 'View demo'),
      url: 'https://fenixlenceria.netlify.app/',
    },
    {
      title: t('Tienda de Instrumentos Musicales', 'Musical Instruments Store'),
      kind: 'UTN',
      tone: 'muted',
      categories: ['academico'],
      description: t(
        'E-commerce full stack con gestión de instrumentos, carritos, pedidos, autenticación por roles, estadísticas y exportación de datos. Proyecto unipersonal con backend en Spring Boot y frontend en React + TypeScript.',
        'Full stack e-commerce with instrument management, carts, orders, role-based authentication, statistics and data export. A solo project with a Spring Boot backend and a React + TypeScript frontend.',
      ),
      stack: 'Java · React + Vite · MySQL',
      image: null,
      placeholder: 'code',
      cta: t('Ver GitHub', 'View on GitHub'),
      url: 'https://github.com/FiammaB/Tp5LabInstrumentosSpringBoot',
    },
    {
      title: t('Empresas y Noticias', 'Companies and News'),
      kind: 'UTN',
      tone: 'muted',
      categories: ['academico'],
      description: t(
        'Aplicación web para gestionar empresas y noticias con operaciones CRUD y búsqueda. Proyecto académico enfocado en backend con PHP, persistencia en MySQL e integración con frontend en HTML, CSS y JavaScript.',
        'Web app to manage companies and news with CRUD operations and search. An academic project focused on a PHP backend, MySQL persistence and an HTML, CSS and JavaScript frontend.',
      ),
      stack: 'PHP · JavaScript · MySQL',
      image: null,
      placeholder: 'code',
      cta: t('Ver GitHub', 'View on GitHub'),
      url: 'https://github.com/FiammaB/TpLabEmpresas',
    },
    {
      title: t('Gestión de Pedidos de Venta', 'Sales Order Management'),
      kind: 'UTN',
      tone: 'muted',
      categories: ['academico'],
      description: t(
        'Sistema web para administrar pedidos, clientes y productos, con búsquedas avanzadas y arquitectura full stack. Desarrollado con Node.js, Express, TypeScript y MySQL.',
        'Web system to manage orders, customers and products, with advanced search and a full stack architecture. Built with Node.js, Express, TypeScript and MySQL.',
      ),
      stack: 'Node.js · TypeScript · MySQL',
      image: null,
      placeholder: 'code',
      cta: t('Ver GitHub', 'View on GitHub'),
      url: 'https://github.com/FiammaB/Projecto-Final-Negocio-Lab-3',
    },
  ];

  const services: Service[] = [
    { title: 'Landing pages', description: t('Landing o one page a medida, responsive y pensada para convertir.', 'Custom landing or one-page sites, responsive and built to convert.') },
    { title: t('Sitios corporativos', 'Business websites'), description: t('Sitios de varias páginas con navegación completa y diseño UX/UI personalizado.', 'Multi-page sites with full navigation and custom UX/UI design.') },
    { title: 'Portfolios', description: t('Portfolios para mostrar tu trabajo de forma clara y con identidad propia.', 'Portfolios that show your work clearly and with their own identity.') },
    { title: t('Tiendas online', 'Online stores'), description: t('Catálogos y tiendas online adaptables a cualquier dispositivo.', 'Catalogs and online stores that work on any device.') },
    { title: t('Apps web', 'Web apps'), description: t('Aplicaciones full stack: frontend en React y backend con Spring Boot o Node.js, con base de datos.', 'Full stack apps: React frontend and a Spring Boot or Node.js backend, with a database.') },
  ];

  return { settings, projects, services };
}
