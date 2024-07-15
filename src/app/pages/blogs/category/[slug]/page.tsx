"use client";

import Loading from "@/app/loading";
import NotFoundPage from "@/app/not-found";
import BreadcrumbCompo from "@/components/Breadcrumb/BreadcrumbCompo";
import ContentCard from "@/components/Card/Card";
import { Button } from "@/components/ui/button";
import { useGetBlogsBySlugCategoryQuery } from "@/lib/api/services/AllBlogs";
import { useState } from "react";
import { HiViewColumns } from "react-icons/hi2";
import { BsFillGridFill } from "react-icons/bs";
import BlogsLayout from "@/components/layout/blogsLayout";
import Container from "@/components/container-section/Container";

export default function BlogsBySlugCategory({
  params,
}: {
  params: { slug: string };
}) {
  const { data, isLoading, error } = useGetBlogsBySlugCategoryQuery(
    params.slug
  );

  const [style, setStyle] = useState<"column" | "grid" | undefined>("column");

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <NotFoundPage text_display="This blog type is empty!" />;
  }
  const handleChange = () => {
    if (style === "column") {
      setStyle("grid");
    } else {
      setStyle("column");
    }
  };

  return (
    <Container>
      <BlogsLayout classNames="px-2">
        <section className="flex justify-between items-center">
          <BreadcrumbCompo
            title={[
              {
                label: "Type: " + params.slug,
                link: `/pages/blogs/category/${params.slug}`,
              },
            ]}
          />
          <Button
            className="text-lg text-primary"
            variant={"link"}
            onClick={handleChange}
          >
            {style !== "column" ? <BsFillGridFill /> : <HiViewColumns />}
          </Button>
        </section>
        <section
          className={`${
            style === "column"
              ? "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1"
              : ""
          }`}
        >
          {data.map((item) => (
            <ContentCard
              option={style}
              blogTitle={item.blogTitle}
              summary={item.summary}
              author={item.author}
              createdAt={item.createdAt}
              countViewer={item.countViewer}
              slug={item.slug}
              thumbnail={item.thumbnail}
              key={item.slug}
            />
          ))}
        </section>
      </BlogsLayout>
    </Container>
  );
}
