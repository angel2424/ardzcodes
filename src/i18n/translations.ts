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
      text: "Hi, i'm a Frontend Engineer with 3 years of professional experience shipping web products, from design system to deployment. I design in Figma, build in Vue, React and Astro, and deliver to thousands of users. Outside my day job, I run DevWorks Studio, a web agency where I’ve built commercial sites, and client-specific digital products for businesses across México and the US. I care about the whole product, not just the frontend layer, and I’m always learning more.",
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
      text: 'Hola, soy un Ingeniero Frontend con 3 años de experiencia profesional lanzando productos web, desde sistemas de diseño hasta despliegue. Diseño en Figma, desarrollo en Vue, React y Astro, y entrego productos a miles de usuarios. Fuera de mi trabajo, dirijo DevWorks Studio, una agencia web donde he construido sitios comerciales y productos digitales a medida para empresas en México y Estados Unidos. Me importa el producto completo, no solo la capa frontend, y siempre estoy aprendiendo más.',
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
