"use client";

import Loading from "@/app/loading";
import NotFoundPage from "@/app/not-found";
import BreadcrumbCompo from "@/components/Breadcrumb/BreadcrumbCompo";
import ContentCard from "@/components/Card/Card";
import { Button } from "@/components/ui/button";
import { useGetBlogsBySlugCategoryQuery } from "@/lib/api/services/AllBlogs";
import { useEffect, useState } from "react";
import { HiViewColumns } from "react-icons/hi2";
import { BsFillGridFill } from "react-icons/bs";
import BlogsLayout from "@/components/layout/blogsLayout";
import Container from "@/components/container-section/Container";
import { isBlog } from "@/components/Tabs/Tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoriesQuery } from "@/lib/api/services/AllTabs";

export default function BlogsBySlugCategory({
  params,
}: {
  params: { slug: string };
}) {
  const [currentCategory, setCategory] = useState<string>(
    params.slug === "all" ? "all" : params.slug
  );

  const {
    data: Categories,
    error: NoCategories,
    isSuccess,
  } = useGetAllCategoriesQuery();

  const {
    data,
    isLoading,
    error,
    refetch: BlogRefetch,
  } = useGetBlogsBySlugCategoryQuery(currentCategory);

  useEffect(() => {
    BlogRefetch();
  }, [currentCategory, BlogRefetch]);

  const [style, setStyle] = useState<"column" | "grid" | undefined>("column");

  if (isLoading) {
    return <Loading />;
  }
  const handleChange = () => {
    if (style === "column") {
      setStyle("grid");
    } else {
      setStyle("column");
    }
  };

  const handleSelect = (value: string) => {
    setCategory(value);
  };

  return (
    <Container>
      <BlogsLayout>
        <section className="flex justify-between items-center my-1">
          <BreadcrumbCompo
            title={[
              {
                label: "Type: " + currentCategory,
                link: `/pages/blogs/category/${currentCategory}`,
              },
            ]}
          />
          <div className="flex justify-between items-center">
            <Select defaultValue={currentCategory} onValueChange={handleSelect}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={currentCategory === "" ? "All" : currentCategory}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"} key={"all"}>
                  All
                </SelectItem>
                {Categories?.map((item) => (
                  <SelectItem value={item.slug} key={item.id}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="text-lg text-primary"
              variant={"link"}
              onClick={handleChange}
            >
              {style !== "column" ? (
                <BsFillGridFill size={25} />
              ) : (
                <HiViewColumns size={25} />
              )}
            </Button>
          </div>
        </section>
        {(error || (data && data.length <= 0)) && (
          <NotFoundPage text_display="This blog type is empty!" />
        )}
        <section
          className={`${
            style === "column"
              ? "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1"
              : ""
          }`}
        >
          {data?.map((item) => (
            <ContentCard
              option={{
                option: style,
              }}
              props={{ ...item }}
              key={isBlog(item) ? item.slug : item.id.toString()}
            />
          ))}
        </section>
      </BlogsLayout>
    </Container>
  );
}
