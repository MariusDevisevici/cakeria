import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

enum ErrorType {
  ZOD_ERROR = "ZodError",
  PRISMA_ERROR = "PrismaClientKnownError",
}

enum ErrorCode {
  PRISMA_ERROR_CODE = "P2002",
}

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

// Format error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === ErrorType.ZOD_ERROR) {
    const fieldsErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );
    return fieldsErrors.join(". ");
  } else if (
    error.name === ErrorType.PRISMA_ERROR &&
    error.code === ErrorCode.PRISMA_ERROR_CODE
  ) {
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt[0].toUpperCase() + field.slice(1)} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export function roundToTwoDecimal(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Invalid Value");
  }
}
