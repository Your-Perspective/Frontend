import Container from "@/components/container-section/Container";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { Products } from "@/constrain/Products";
import ProductDetail from "@/components/product/ProductDetail";

type Props = {
  params: { uuid: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uuid = params.uuid;

  const filterItems = Products.filter((item) => item.uuid === uuid)[0];

  return {
    title: `${filterItems?.title} | Your Perspective` || "404 not found",
    description: filterItems?.description || "404 not found",
  };
}

export default function DetailProductPage({
  params,
}: {
  params: { uuid: string };
}) {
  return (
    <Container>
      <ProductDetail uuid={params.uuid} />
    </Container>
  );
}
