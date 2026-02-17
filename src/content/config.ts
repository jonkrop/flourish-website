import { defineCollection, z } from 'astro:content';

const topics = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    intro: z.string().optional(),
    sections: z.array(z.object({
      title: z.string(),
      collapsed: z.boolean().default(false),
      items: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
        type: z.enum(['pdf', 'audio', 'video', 'link']),
        url: z.string(),
      })),
    })),
  }),
});

const clients = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    topics: z.array(z.string()),
  }),
});

export const collections = { topics, clients };
