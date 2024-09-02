import { z } from "zod";

export const paramsSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Invalid id",
    }),
});

export const queryParamsSchema = z.object({
  search: z.string().optional().default(""),
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a positive integer")
    .transform((val) => parseInt(val, 10))
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a positive integer")
    .transform((val) => parseInt(val, 10))
    .optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export const updateTaskSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
    state: z.enum(["To do", "In progress", "Done"]).optional(),
  })
  .refine((data) => data.title || data.state, {
    message: "At least one of 'title' or 'state' is required",
    path: ["title", "state"],
  });
