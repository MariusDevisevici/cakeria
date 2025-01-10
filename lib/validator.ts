import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))),
    "Price must have exactly 2 decimal places"
  );

// SCHEMA FOR INSERTING PRODUCTS
export const insertProductSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 chars")
    .max(255, "Name must be at most 255 chars"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 chars")
    .max(255, "Slug must be at most 255 chars"),
  category: z
    .string()
    .min(3, "Category must be at least 3 chars")
    .max(255, "Category must be at most 255 chars"),
  description: z
    .string()
    .min(3, "Description must be at least 3 chars")
    .max(255, "Description must be at most 255 chars")
    .nullable(),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// SCHEMA FOR SIGNING UP
export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});
