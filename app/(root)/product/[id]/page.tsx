import { notFound } from "next/navigation";

import { prisma } from "@/prisma/client";
import { ProductInfo } from "@/components/shared";
import { Container } from "@/components/ui";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        // TODO separate request in useEffcet
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-5">
      <ProductInfo product={product} />
    </Container>
  );
}
