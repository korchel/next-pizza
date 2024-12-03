import { Container, Filters, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
        
      </Container>

      <TopBar />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          <div className="w-[205px]">
            <Filters />
          </div>
        </div>
        <div>
          {/* <ProductsGroupList title="Pizzas" items={[1, 2, 3, 4, 5]} />
          <ProductsGroupList title="Combo" items={[1, 2, 3, 4, 5]} /> */}
        </div>
        
      </Container>
    </>
  );
}
