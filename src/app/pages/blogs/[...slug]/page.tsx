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
  const username = params.slug[0];

  const blogData = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/@${username}/${slug}`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err.message);
      return null;
    });

  if (!blogData) {
    return {
      title: "404 not found",
      description: "Blog not found",
      openGraph: {
        images: [],
      },
    };
  }

  const ogImage = blogData.thumbnail || null;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${slug} | Your Perspective` || "404 not found",
    description: blogData.description || "404 not found",
    openGraph: {
      images: ogImage ? [...previousImages, ogImage] : previousImages,
    },
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
