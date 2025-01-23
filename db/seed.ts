import { PrismaClient } from "@prisma/client";
import { SAMPLE_DATA } from "./sample-data";
import { hash } from "@/lib/encrypt";

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
  const users = [];
  for (let i = 0; i < SAMPLE_DATA.users.length; i++) {
    users.push({
      ...SAMPLE_DATA.users[i],
      password: await hash(SAMPLE_DATA.users[i].password),
    });
  }

  await prisma.user.createMany({
    data: users,
  });

  console.log("Seeded sample data");
}
main();
