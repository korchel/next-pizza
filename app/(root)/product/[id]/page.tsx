import { Container, ProductImage, ProductTypeSelector, Title } from "@/components/shared";
import { prisma } from "@/prisma/client"
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) }
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} className="" size={40} />
        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gra-400">ffff</p>
          <ProductTypeSelector items={[
            {
              name: "small",
              value: '1',
              disabled: true,
            },
            {
              name: "medium",
              value: '2',
            },
            {
              name: "large",
              value: '3',
            }
          ]}
          selectedValue="2"
          />
        </div>
      </div>
    </Container>
  );
}