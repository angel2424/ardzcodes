# Portfolio (Astro + Tailwind)

This repo was migrated from Create React App to **Astro** and the styling stack now uses **Tailwind CSS**.

## Scripts

- `npm run dev` - Start Astro dev server
- `npm run build` - Build production site to `dist/`
- `npm run preview` - Preview built site locally

## Stack

- Astro
- Tailwind CSS
- i18next (language toggle)
- Yup (contact form validation)
- Netlify form submission

## Routes

- `/` Home
- `/portfolio` Portfolio page
- `/success` Form success page
- `/work` Case studies index
- `/work/[slug]` Dynamic markdown case study page

## Writing Case Studies

- Add markdown files to `src/content/work/`.
- Each file frontmatter supports fields like `title`, `excerpt`, `publishedAt`, `cover`, `tags`, `client`, `role`, `projectUrl`, and `repoUrl`.
- Project cards link to `/work/<slug>` where slug comes from project JSON `slug` (or a title-based fallback).
