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

  function getImageExtension(url: string) {
    const parts = url.split(".");
    const extensionPart = parts.pop();
    if (extensionPart) {
      const extension = extensionPart.split("?")[0];
      return extension;
    }
    return null;
  }
  const ogImage = blogData.thumbnail || null;
  const imageExtension = ogImage ? getImageExtension(ogImage) : null;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${blogData.blogTitle} | Your Perspective` || "404 not found",
    description: blogData.summary || "404 not found",
    keywords: blogData.blogTitle.split(" "),
    category: blogData.blogTitle,
    openGraph: {
      type: "article",
      authors: blogData.author.userName,
      countryName: "Cambodia",
      ttl: 255,
      siteName: blogData.blogTitle,
      description: blogData.summary || "404 not found",
      determiner: "the",
      modifiedTime: blogData.createdAt,
      images: [ogImage, ...previousImages],
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
