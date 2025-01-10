import { PrismaClient } from "@prisma/client";
import { SAMPLE_DATA } from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.createMany({
    data: SAMPLE_DATA.products,
  });
  await prisma.user.createMany({
    data: SAMPLE_DATA.users,
  });

  console.log("Seeded sample data");
}
main();
