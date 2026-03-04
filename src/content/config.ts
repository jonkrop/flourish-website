import { defineCollection, z } from 'astro:content';

const topics = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string().optional(),
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
      })).default([]),
    })),
  }),
});

const clients = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string().optional(),
    name: z.string(),
    topics: z.array(z.string()),
    presenters: z.array(z.object({
      topic: z.string(),
      speakers: z.array(z.string()),
    })).optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    intro: z.string().optional(),
    presenters: z.array(z.string()).optional(),
    sections: z.array(z.object({
      title: z.string(),
      collapsed: z.boolean().default(false),
      items: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
        type: z.enum(['pdf', 'audio', 'video', 'link']),
        url: z.string(),
      })).default([]),
    })),
  }),
});

const experts = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string().optional(),
    name: z.string(),
    fullName: z.string(),
    role: z.string(),
    photo: z.string(),
    bio: z.string(),
    credentials: z.array(z.string()),
    topicTags: z.array(z.string()),
    quote: z.string().optional(),
    quoteAttribution: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { topics, clients, events, experts };
