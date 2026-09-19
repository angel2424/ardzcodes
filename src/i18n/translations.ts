export type Lang = 'en' | 'es'

const translations = {
  en: {
    header: {
      home: 'Home',
      portfolio: 'Portfolio',
      contact: "Let's work together!",
    },
    hero: {
      hello: "Hello World! I'm Angel",
      role: 'Front-end Web Developer',
      location: 'Based in Piedras Negras, Coahuila, Mexico',
      button: "Let's work together!",
    },
    work: {
      title: 'My favorite work',
      projectButton1: 'Live Website',
      projectButton2: 'Github',
      projectButton3: 'Case Study',
      button: 'View more of my work',
    },
    about: {
      title: 'About Me',
      text: 'Product-minded UI & Front-End Engineer with hands-on experience bridging UI/UX design, design systems, and modern front-end architecture. Proven track record of establishing component design systems, leading client discovery to backend schema alignment, and building scalable web applications with Vue 3, React, Next.js, and Quasar. Primary design system and front-end lead across engineering teams, specializing in clean, user-centered digital interfaces.',
    },
    contact: {
      title: "Let's get in contact!",
      subTitle: 'Want to hire me?',
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Message',
      btn: 'Submit',
    },
    portfolio: {
      text: 'Welcome! Here you can view all my projects from personal to more professional work.',
    },
    success: {
      title: 'Thank you for your message! 🥳',
      text: 'I will reach out as soon as I can',
      back: 'Go back to home page',
    },
  },
  es: {
    header: {
      home: 'Inicio',
      portfolio: 'Portfolio',
      contact: '¡Trabajemos juntos!',
    },
    hero: {
      hello: '¡Hola Mundo! Soy Angel',
      role: 'Desarrollador Front End',
      location: 'Ubicado en Piedras Negras, Coahuila, Mexico',
      button: '¡Trabajemos juntos!',
    },
    work: {
      title: 'Mi trabajo favorito',
      projectButton1: 'Live Website',
      projectButton2: 'Github',
      projectButton3: 'Caso de estudio',
      button: 'Conoce mas de mi trabajo',
    },
    about: {
      title: 'Acerca de Mi',
      text: 'Ingeniero Front-End enfocado en desarrollo de producto, con experiencia enla construcción de aplicaciones web escalables e interfaces responsivas de alta calidad utilizando React, TypeScript y JavaScript moderno. Cuento con trayectoria liderando funcionalidades complejas, integrando APIs RESTful y colaborando activamente en equipos de ingeniería remotos con esquemas de trabajo asíncronos. Apasionado por la mejora continua, el equilibrio entre los requerimientos técnicos y la experiencia de usuario, y el aprovechamiento de herramientas modernas para generar productos de alto impacto.',
    },
    contact: {
      title: '¡Comunicate conmigo!',
      subTitle: '¿Quieres contratarme?',
      name: 'Nombre',
      email: 'Correo Electrónico',
      subject: 'Asunto',
      message: 'Mensaje',
      btn: 'Enviar',
    },
    portfolio: {
      text: '¡Bienvenido! Aqui puedes encontrar la mayoria de mis proyectos, desde los personales a los mas profesionales',
    },
    success: {
      title: '¡Gracias por tu mensaje! 🥳',
      text: 'Me pondré en contacto contigo lo antes posible',
      back: 'Volver al inicio',
    },
  },
} as const

export function useTranslations(lang: Lang) {
  return translations[lang]
}
