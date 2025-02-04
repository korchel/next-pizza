import { Suspense } from "react";

import {
  Filters,
  TopBar,
  Stories,
  ProductsGroupList,
} from "@/components/shared";
import { Container, Title } from "@/components/ui";
import { filterPizzas, SearchParams } from "@/shared/lib/filterPizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const categories = await filterPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Stories className="hidden sm:block" />
      <Container className="pb-14 mt-10">
        <div className="flex flex-col sm:flex-row gap-10 md:gap-20">
          <Suspense>
            <Filters />
          </Suspense>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
