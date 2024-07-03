import Container from "@/components/container-section/Container";
import ProductList from "@/components/product/ProductList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Your perspective",
  description: "Discover untold stories and whispered tales on our channel",
};

export default function ShopPage() {
  return (
    <Container classNames="text-primary">
      <div className="my-10 grid md:grid-cols-2 grid-cols-1 gap-5 justify-between items-center">
        <div className="grid gap-2">
          <h1 className="font-medium">Welcome</h1>
          <p className="text-4xl capitalize font-semibold">
            <span className="text-primaryColor">Your</span> perspective |
            Products
          </p>
        </div>
        <div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <ProductList />
    </Container>
  );
}
