import { z } from "zod";

// The process schema limits request size before the model pipeline runs.
export const processSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Write some text to process")
    .max(1000, "Text is too long"),
});
