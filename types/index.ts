import { z } from "zod";
import {
  cartItemSchema,
  cartSchema,
  insertProductSchema,
} from "@/lib/validator";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
