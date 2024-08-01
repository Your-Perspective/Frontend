"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentCard from "../Card/Card";
import { BlogsProps, ContentsTypeProps, TabItem } from "@/types/Types";
import BlogsLayout from "../layout/blogsLayout";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import NotFoundPage from "@/app/not-found";
import Loading from "@/app/loading";
import { useGetBlogsBySlugCategoryQuery } from "@/lib/api/services/AllBlogs";
import { useGetAllCategoriesQuery } from "@/lib/api/services/AllTabs";
import Error from "@/app/error";
import { Button } from "../ui/button";
import { BsFillGridFill } from "react-icons/bs";
import { HiViewColumns } from "react-icons/hi2";

export const isBlog = (item: BlogsProps): item is ContentsTypeProps => {
  return (item as ContentsTypeProps).slug !== undefined;
};

export default function TabsGategory() {
  const [category, setCategory] = useState<string>("all");

  const {
    data: blogPosts,
    isLoading: BlogLoading,
    error: BlogsError,
    refetch,
  } = useGetBlogsBySlugCategoryQuery(category === "all" ? "" : category);
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const [style, setStyle] = useState<"column" | "grid" | undefined>("grid");
  const handleChange = () => {
    if (style === "column") {
      setStyle("grid");
    } else {
      setStyle("column");
    }
  };

  const onTabChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (BlogLoading) {
    return <Loading />;
  }

  if (BlogsError || categoriesError) {
    throw Error;
  }

  return (
    <Tabs
      aria-label="tabs-gategory"
      value={category}
      onValueChange={onTabChange}
      className="pb-5 sticky top-10 z-10 h-screen"
    >
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent dark:bg-0 p-0">
        <ScrollArea className="w-full whitespace-nowrap rounded-md shadow-none">
          <TabsTrigger
            className="relative capitalize rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            key={"all"}
            value={"all"}
          >
            All
          </TabsTrigger>
          {categories?.map((item: TabItem) => (
            <TabsTrigger
              className="relative capitalize rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              key={item.id}
              value={item.slug}
            >
              {item.title}
            </TabsTrigger>
          ))}
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </TabsList>
      <TabsContent className="relative" key={"all"} value={"all"}>
        <BlogsLayout arai_label={"all-blogs"}>
          {BlogLoading && <Loading />}
          <div className="flex justify-between items-center sticky top-0 bg-white dark:bg-background py-2">
            <h1 className="font-bold text-primary">All</h1>
            <Button
              className="text-lg text-primary"
              variant={"link"}
              onClick={handleChange}
            >
              {style !== "column" ? <BsFillGridFill /> : <HiViewColumns />}
            </Button>
          </div>
          {!blogPosts ||
            (blogPosts.length === 0 && (
              <div className="py-3">
                <NotFoundPage text_display="Contents not found!" />
              </div>
            ))}
          <section
            className={`${
              style === "column"
                ? "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1"
                : ""
            }`}
          >
            {blogPosts?.map((item) => (
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
      </TabsContent>
      {categories?.map((item) => (
        <TabsContent key={item.id} value={item.slug} className="relative">
          <BlogsLayout arai_label={item.title}>
            {BlogLoading && <Loading />}
            <div className="flex justify-between items-center sticky top-0 bg-white dark:bg-background py-2">
              <h1 className="font-bold text-primary capitalize">
                {item.title}
              </h1>
              <Button
                className="text-lg text-primary"
                variant={"link"}
                onClick={handleChange}
              >
                {style !== "column" ? <BsFillGridFill /> : <HiViewColumns />}
              </Button>
            </div>
            {!blogPosts ||
              (blogPosts.length === 0 && (
                <div className="py-3">
                  <NotFoundPage text_display="Contents not found!" />
                </div>
              ))}
            <section
              className={`${
                style === "column"
                  ? "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1"
                  : ""
              }`}
            >
              {blogPosts?.map((item) => (
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
        </TabsContent>
      ))}
    </Tabs>
  );
}
