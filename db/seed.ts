import { PrismaClient } from "@prisma/client";
import { SAMPLE_DATA } from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: SAMPLE_DATA.products,
  });

  console.log("Seeded sample data");
}
main();
