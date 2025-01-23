"use server";

import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { convertToPlainObject, formatError, roundToTwoDecimal } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, cartSchema } from "../validator";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

const calculatePrice = (items: CartItem[]) => {
  const itemsPrice = roundToTwoDecimal(
    items.reduce((acc, itm) => acc + Number(itm.price) * itm.qty, 0)
  );

  const shippingPrice = roundToTwoDecimal(itemsPrice > 100 ? 0 : 10);
  const taxPrice = roundToTwoDecimal(0.15 * itemsPrice);
  const totalPrice = roundToTwoDecimal(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session not found");

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getCart();

    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not found");
    if (!cart) {
      const newCart = cartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calculatePrice([item]),
      });
      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: "Item added to cart",
      };
    } else {
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );
      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) throw new Error("Not enough stock");
        cart.items.push(item);
      }
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calculatePrice(cart.items as CartItem[]),
        },
      });
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : "added to"
        } cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;

  if (!sessionCartId) throw new Error("Cart session not found");

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  const userCart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!userCart) return undefined;

  return convertToPlainObject({
    ...userCart,
    items: userCart.items as CartItem[],
    itemsPrice: userCart.itemsPrice.toString(),
    totalPrice: userCart.totalPrice.toString(),
    shippingPrice: userCart.shippingPrice.toString(),
    taxPrice: userCart.taxPrice.toString(),
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session not found");

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) throw new Error("Product not found");

    const cart = await getCart();
    if (!cart) throw new Error("Cart not found");

    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );

    if (!exist) throw new Error("Item not found");

    if (exist.qty === 1) {
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== productId
      );
    } else {
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calculatePrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
