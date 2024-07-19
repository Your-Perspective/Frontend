import type { Metadata, ResolvingMetadata } from "next";
import Container from "@/components/container-section/Container";
import React from "react";
import BlogDetailLayout from "@/components/layout/BlogDetail";
import BlogDetail from "@/components/Blog/BlogDetail";

type Props = {
  params: { slug: [string, string] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug[1];

  return {
    title: `${slug} | Your Perspective` || "404 not found",
    description: slug || "404 not found",
  };
}

export default function BlogsDetailByUuid({
  params,
}: {
  params: { slug: [string, string] };
}) {
  return (
    <Container>
      <BlogDetailLayout>
        <BlogDetail username={params.slug[0]} slug={params.slug[1]} />
      </BlogDetailLayout>
    </Container>
  );
}
