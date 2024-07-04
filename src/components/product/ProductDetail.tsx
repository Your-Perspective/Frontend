"use client";

import { Products } from "@/constrain/Products";
import { ProductCardProps } from "@/types/Types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import ProductCard from "./ProductCard";
import BreadcrumbCompo from "../Breadcrumb/BreadcrumbCompo";

export default function ProductDetail({ uuid }: { uuid: string }) {
  const [product, setProduct] = useState<ProductCardProps | undefined>();
  const [otherProduct, setOtherProduct] = useState<
    ProductCardProps[] | undefined
  >();

  useEffect(() => {
    const foundProduct = Products.find((product) => product.uuid === uuid);
    const foundOtherProduct = Products.filter(
      (product) => product.uuid !== uuid
    );
    setOtherProduct(foundOtherProduct);
    setProduct(foundProduct);
  }, [uuid]);

  if (product) {
    return (
      <section aria-label={product.title} className="my-10">
        <BreadcrumbCompo
          title={[
            { label: "shop", link: "/pages/shop" },
            { label: product.title, link: "" },
          ]}
        />
        <section className="grid md:grid-cols-2 grid-cols-1 gap-5 my-10">
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="lg:w-1/2 md:w-2/3 w-full mx-auto"
          />
          <section
            aria-label="product-into"
            className="flex flex-col justify-around items-start gap-5"
          >
            <div>
              <h1 className="font-semibold">{product.title}</h1>
              <div className="flex flex-col gap-5">
                <p className="text-3xl mt-10">
                  {product.newPrice && (
                    <span>
                      {product.oldPrice && (
                        <span className="line-through text-primary">
                          ${product.oldPrice}
                        </span>
                      )}{" "}
                      <span className="text-destructive dark:text-yellow-400 font-bold">
                        ${product.newPrice}
                      </span>
                    </span>
                  )}
                </p>
                <p className="text-3xl">
                  {product.size && (
                    <span className="flex items-center gap-5">
                      Size:{" "}
                      <span className="flex gap-2 flex-wrap">
                        {product.size.map((item) => (
                          <Badge
                            key={item}
                            className="uppercase text-lg min-w-[50px] p-1 justify-center"
                          >
                            {item}
                          </Badge>
                        ))}
                      </span>
                    </span>
                  )}
                </p>
                <p className="text-3xl">
                  {product.colors && (
                    <span className="flex gap-5 items-center">
                      Colors:
                      <span className="flex gap-2 flex-wrap">
                        {product.colors.map((item) => (
                          <span
                            key={item}
                            className={` rounded-full w-[30px] h-[30px]`}
                            style={{ backgroundColor: item || undefined }}
                          ></span>
                        ))}
                      </span>
                    </span>
                  )}
                </p>
                <p className="text-gray-500">{product.description}</p>
              </div>
            </div>
          </section>
        </section>
        <section className="my-10">
          <h2 className="my-5 font-semibold">Related Products</h2>
          <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
            {otherProduct &&
              otherProduct
                .slice(0, 4)
                .map((item) => (
                  <ProductCard
                    key={item.uuid}
                    uuid={item.uuid}
                    oldPrice={item.oldPrice}
                    newPrice={item.newPrice}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    type={item.type}
                    description={item.description}
                    colors={item.colors}
                  />
                ))}
          </section>
        </section>
      </section>
    );
  }
}
