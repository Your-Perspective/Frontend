import type { Metadata, ResolvingMetadata } from "next";
import Container from "@/components/container-section/Container";
import React from "react";
import { Contents } from "@/constrain/Contents";
import BlogDetailLayout from "@/components/layout/BlogDetail";
import BlogDetail from "@/components/Blog/BlogDetail";

type Props = {
  params: { uuid: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uuid = params.uuid;

  const filterItems = Contents.filter((item) => item.uuid === uuid)[0];

  return {
    title: `${filterItems?.title} | Your Perspective` || "404 not found",
    description: filterItems?.description || "404 not found",
  };
}

export default function BlogsDetailByUuid({
  params,
}: {
  params: { uuid: string };
}) {
  return (
    <Container>
      <BlogDetailLayout>
        <BlogDetail uuid={params.uuid} />
      </BlogDetailLayout>
    </Container>
  );
}
