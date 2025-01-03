import { prisma } from "./client";
import { hashSync } from "bcrypt";
import { categories, ingredients, products } from "./constants";
import { Prisma } from "@prisma/client";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductVariant = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: getRandomNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductVariantUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "user",
        email: "user@test.ru",
        phone: "111",
        password: hashSync("11111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "admin",
        email: "admin@test.ru",
        phone: "222",
        password: hashSync("11111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl: "/pizzas/Чоризо фреш.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Овощи и грибы",
      imageUrl: "/pizzas/Овощи и грибы.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Песто",
      imageUrl: "/pizzas/Песто.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productVariant.createMany({
    data: [
      generateProductVariant({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductVariant({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductVariant({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      generateProductVariant({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductVariant({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      generateProductVariant({ productId: 1 }),
      generateProductVariant({ productId: 2 }),
      generateProductVariant({ productId: 3 }),
    ],
  });

  // test cart
  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalCost: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalCost: 0,
        token: "11111",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productVariantId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
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
