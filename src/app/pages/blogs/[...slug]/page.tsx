import type { Metadata, ResolvingMetadata } from "next";
import Container from "@/components/container-section/Container";
import React from "react";
import BlogDetailLayout from "@/components/layout/BlogDetail";
import BlogDetail from "@/components/Blog/BlogDetail";
import { enviromentURL } from "@/app/layout";

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

  const ogImage = blogData.thumbnail || null;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${blogData.blogTitle} | Your Perspective` || "404 not found",
    description: blogData.summary || "404 not found",
    keywords: blogData.blogTitle.split(" "),
    category: blogData.blogTitle,
    openGraph: {
      type: "website",
      url: `${enviromentURL}pages/blogs/${username}/${slug}`,
      countryName: "Cambodia",
      siteName: blogData.blogTitle,
      description: blogData.summary || "404 not found",
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
