import * as Yup from 'yup';
import confetti from 'canvas-confetti';

const selectAll = (root, selector) => Array.from(root.querySelectorAll(selector));

function getAppRoot() {
  return document.querySelector('[data-app-root]');
}

function applyTheme(theme) {
  const appRoot = getAppRoot();

  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  if (appRoot) {
    appRoot.setAttribute('data-theme', theme);
  }

  selectAll(document, '[data-dark-src]').forEach((element) => {
    if (!(element instanceof HTMLImageElement)) return;

    const darkSrc = element.dataset.darkSrc;
    const lightSrc = element.dataset.lightSrc || darkSrc;

    if (!darkSrc || !lightSrc) return;
    element.src = theme === 'dark' ? darkSrc : lightSrc;
  });

  selectAll(document, '[data-theme-icon]').forEach((icon) => {
    icon.style.color = theme === 'dark' ? '#ffffff' : '#000000';
  });
}

function initThemeToggle() {
  const storedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : systemTheme;
  applyTheme(initialTheme);

  const toggleButton = document.getElementById('theme-toggle');
  if (!(toggleButton instanceof HTMLButtonElement)) return;

  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

function getLang() {
  return window.location.pathname.startsWith('/es') ? 'es' : 'en';
}


function initCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  const updateCursorVisibility = () => {
    cursor.style.display = window.innerWidth < 1100 ? 'none' : 'block';
  };

  const onMouseMove = (event) => {
    if (window.innerWidth < 1100) return;

    const mouseX = event.clientX - cursor.clientWidth / 2;
    const mouseY = event.clientY - cursor.clientHeight / 2;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  };

  const onMouseOver = (event) => {
    const tag = event.target?.tagName;
    const interactive = ['A', 'BUTTON', 'SVG', 'PATH', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL', 'I', 'IMG'];
    cursor.className = interactive.includes(tag) ? 'app-cursor2' : 'app-cursor';
  };

  updateCursorVisibility();
  window.addEventListener('resize', updateCursorVisibility);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseover', onMouseOver);
}

function initHeader() {
  const navContainer = document.getElementById('nav-container');
  const menuButton = document.getElementById('menu-toggle');
  const barTop = document.getElementById('menu-bar-top');
  const barBottom = document.getElementById('menu-bar-bottom');
  const logoImage = document.getElementById('logo-image');
  const logoText = document.getElementById('logo-text');

  if (!navContainer || !menuButton || !barTop || !barBottom || !logoImage || !logoText) return;

  const navLinks = selectAll(navContainer, 'nav a');
  let open = false;

  const applyMenuState = () => {
    if (window.innerWidth < 1100) {
      navContainer.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
    } else {
      navContainer.style.transform = '';
      open = false;
      barTop.style.transform = '';
      barBottom.style.transform = '';
    }
  };

  const animateBars = () => {
    barTop.style.transform = open ? 'rotate(45deg) translateY(4px)' : 'none';
    barBottom.style.transform = open ? 'rotate(-45deg) translateY(-4px)' : 'none';
  };

  menuButton.addEventListener('click', () => {
    open = !open;
    animateBars();
    applyMenuState();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1100) {
        open = false;
        animateBars();
        applyMenuState();
      }
    });
  });

  window.addEventListener('resize', applyMenuState);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 5) {
      logoText.style.opacity = '0';
      logoText.style.pointerEvents = 'none';
      logoImage.style.width = window.innerWidth < 1100 ? '60px' : '70px';
    } else {
      logoText.style.opacity = '1';
      logoText.style.pointerEvents = 'auto';
      logoImage.style.width = '50px';
    }
  });

  applyMenuState();
}

function initHero() {
  const hand = document.getElementById('hero-hand');
  if (!hand) return;

  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX - hand.clientWidth / 2;
    hand.style.transform = `rotate(${mouseX / 80}deg)`;
  });
}

function getValidationSchema(lang) {
  return Yup.object({
    name: Yup.string()
      .max(20, lang === 'en' ? 'Name must be 20 characters or less' : 'Nombre debe de ser 20 caracteres o menos')
      .required(lang === 'en' ? 'Name is required' : 'Nombre es requerido'),
    email: Yup.string()
      .email(lang === 'en' ? 'Invalid email address' : 'Correo electrónico invalido')
      .required(lang === 'en' ? 'Email is required' : 'Correo Electrónico es requerido'),
    subject: Yup.string()
      .max(20, lang === 'en' ? 'Subject must be 25 characters or less' : 'Asunto debe de ser 25 caracteres o menos')
      .required(lang === 'en' ? 'Subject is required' : 'Asunto es requerido'),
    message: Yup.string()
      .min(20, lang === 'en' ? 'Message must be 20 characters or more' : 'Mensaje debe de ser 20 caracteres o más')
      .required(lang === 'en' ? 'Subject is required' : 'Asunto es requerido')
  });
}

function encodeForm(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!(form instanceof HTMLFormElement)) return;

  const lang = form.dataset.lang ?? getLang();

  const labels = {
    name: form.querySelector('[data-field-label="name"]'),
    email: form.querySelector('[data-field-label="email"]'),
    subject: form.querySelector('[data-field-label="subject"]'),
    message: form.querySelector('[data-field-label="message"]')
  };

  const fields = ['name', 'email', 'subject', 'message'];
  const touched = {
    name: false,
    email: false,
    subject: false,
    message: false
  };

  const originalLabels = {
    name: labels.name?.textContent ?? '',
    email: labels.email?.textContent ?? '',
    subject: labels.subject?.textContent ?? '',
    message: labels.message?.textContent ?? '',
  };

  const resetLabel = (field) => {
    const label = labels[field];
    if (!label) return;

    label.classList.remove('text-red-500', 'font-medium');
    label.textContent = originalLabels[field];
  };

  const setError = (field, message) => {
    const label = labels[field];
    if (!label) return;

    label.classList.add('text-red-500', 'font-medium');
    label.textContent = message;
  };

  const getValues = () => {
    const formData = new FormData(form);
    return {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || '')
    };
  };

  const validateField = async (field) => {
    const values = getValues();

    try {
      await getValidationSchema(lang).validateAt(field, values);
      resetLabel(field);
      return null;
    } catch (error) {
      setError(field, error.message);
      return error.message;
    }
  };

  fields.forEach((field) => {
    const input = form.elements.namedItem(field);
    if (!(input instanceof HTMLElement)) return;

    input.addEventListener('blur', async () => {
      touched[field] = true;
      await validateField(field);
    });

    input.addEventListener('input', async () => {
      if (!touched[field]) return;
      await validateField(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const values = getValues();

    try {
      await getValidationSchema(lang).validate(values, { abortEarly: false });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': 'contact', ...values })
      });

      form.reset();
      fields.forEach((field) => {
        touched[field] = false;
        resetLabel(field);
      });

      window.location.href = lang === 'es' ? '/es/success' : '/success';
    } catch (error) {
      if (error?.name === 'ValidationError') {
        const messages = new Map();
        error.inner.forEach((item) => {
          if (item.path && !messages.has(item.path)) {
            messages.set(item.path, item.message);
          }
        });

        fields.forEach((field) => {
          if (messages.has(field)) {
            setError(field, messages.get(field));
          } else {
            resetLabel(field);
          }
        });
        return;
      }

      alert('Error');
    }
  });
}

function initSuccessConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const shoot = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });

  const end = Date.now() + 3000;

  const frame = () => {
    shoot({
      particleCount: 4,
      startVelocity: 25,
      spread: 360,
      gravity: 0.2,
      ticks: 120,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

function initApp() {
  initThemeToggle();
  initContactForm();
  initCursor();
  initHeader();
  initHero();
  initSuccessConfetti();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initApp().catch(console.error);
  });
} else {
  initApp().catch(console.error);
}
