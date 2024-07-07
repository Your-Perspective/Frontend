"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentCard from "../Card/Card";
import { ContentsTypeProps, TabItem } from "@/types/Types";
import BlogsLayout from "../layout/blogsLayout";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import NotFoundPage from "@/app/not-found";
import Loading from "@/app/loading";
import { useGetBlogsBySlugCategoryQuery } from "@/lib/api/services/AllBlogs";
import { useGetAllCategoriesQuery } from "@/lib/api/services/AllTabs";
import Error from "@/app/error";

export default function TabsGategory() {
  const [category, setCategory] = useState<string>("all");
  const {
    data: blogPosts,
    isLoading: BlogLoading,
    error: BlogsError,
  } = useGetBlogsBySlugCategoryQuery(category === "all" ? "blogs/" : category);
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery("");

  const onTabChange = (value: string) => {
    setCategory(value);
  };

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
      className="py-3 sticky top-0 z-10"
    >
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent dark:bg-0 p-0">
        <ScrollArea className="w-full whitespace-nowrap rounded-md shadow-none">
          <TabsTrigger
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            key={"all"}
            value={"all"}
          >
            All
          </TabsTrigger>
          {categories?.map((item: TabItem) => (
            <TabsTrigger
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              key={item.id}
              value={item.slug}
            >
              {item.title}
            </TabsTrigger>
          ))}
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </TabsList>
      <TabsContent key={"all"} value={"all"}>
        <BlogsLayout arai_label={"all-blogs"}>
          <h1 className="font-bold text-primary">All</h1>
          <div className="py-3">
            {!blogPosts ||
              (blogPosts.length === 0 && (
                <NotFoundPage text_display="Contents not found!" />
              ))}
          </div>
          <div className="flex flex-col gap-4">
            {blogPosts?.map((item: ContentsTypeProps) => (
              <ContentCard
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
          </div>
        </BlogsLayout>
      </TabsContent>
      {categories?.map((item) => (
        <TabsContent key={item.id} value={item.slug}>
          <BlogsLayout arai_label={item.title}>
            <h1 className="font-bold text-primary">{item.title}</h1>
            <div className="py-3">
              {!blogPosts ||
                (blogPosts.length === 0 && (
                  <NotFoundPage text_display="Contents not found!" />
                ))}
            </div>
            <div className="flex flex-col gap-4">
              {blogPosts?.map((item: ContentsTypeProps) => (
                <ContentCard
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
            </div>
          </BlogsLayout>
        </TabsContent>
      ))}
    </Tabs>
  );
}
