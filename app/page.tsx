import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductCard } from "@/components/shared/ProductCard";
import { ProductsGroupList } from "@/components/shared/ProductsGroupList";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[205px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 21,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 221,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 221,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 221,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Комбо"
                items={[
                  {
                    id: 1,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 221,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 122,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 12,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1222,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={2}
              />
              <ProductsGroupList
                title="Закуски"
                items={[
                  {
                    id: 1,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 12,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 221,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 21,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2221,
                    name: "pizza",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EEF9E43DC39C94AA5765DBF1C97100.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={3}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
