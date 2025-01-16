import { ProductModal } from "@/components/shared";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ProductModal product={product} />;
}
