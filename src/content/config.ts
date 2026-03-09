import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    client: z.string().optional(),
    role: z.string().optional(),
    projectUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional()
  })
});

export const collections = { work };
