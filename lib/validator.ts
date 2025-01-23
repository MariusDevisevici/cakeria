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

// SCHEMA FOR SIGNING IN
export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

// SCHEMA FOR REGISTERING
export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 chars"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    confirmPassword: z.string().min(6, "Ivalid confirmation password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// CART SCHEMAS
export const cartItemSchema = z.object({
  productId: z.string().min(1, "At least one product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is Required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: currency,
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});
