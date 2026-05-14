import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const stories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stories" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    file: z.string(),
    format: z.string().default("SugarCube"),
    order: z.number().default(0),
  }),
});

export const collections = { stories };
