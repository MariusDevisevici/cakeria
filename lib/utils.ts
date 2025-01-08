import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert  prisma object into plain object
export function convertToPlainObject<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

// Format number with decimal places
export function formatNumberWithDecimal(number: number) {
  const [integer, decimal] = number.toString().split(".");
  return decimal ? `${integer}.${decimal.padEnd(2, "0")}` : `${integer}.00`;
}
