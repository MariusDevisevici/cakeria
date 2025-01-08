"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";

// GET LATEST PRODUCTS
export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
  return convertToPlainObject(products);
}

// GET PRODUCT BY SLUG
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });
  return convertToPlainObject(product);
}
