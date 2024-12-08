import { prisma } from "./client";
import { hashSync } from 'bcrypt';
import { categories, ingredients, products } from "./constants";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'user',
        email: 'user@test.ru',
        phone: '111',
        password: hashSync('11111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'admin',
        email: 'admin@test.ru',
        phone: '222',
        password: hashSync('11111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ]
  })

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const 
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;

} 

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });