"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Contents, tabs } from "@/constrain/Contents";
import ContentCard from "../Card/Card";
import { ContentsTypeProps } from "@/types/Types";
import BlogsLayout from "../layout/blogsLayout";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import NotFoundPage from "@/app/not-found";
import Loading from "@/app/loading";

export default function TabsGategory() {
  const [category, setCategory] = useState<string>("all");
  const [contentData, setContentData] = useState<ContentsTypeProps[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const onTabChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    let filteredContents = null;
    if (category !== "all") {
      filteredContents = Contents.filter((item) => item.category === category);
    } else {
      filteredContents = Contents;
    }
    setContentData(filteredContents);
    setLoading(false);
  }, [category]);

  if (loading) {
    return <Loading />;
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
          {tabs.map((item) => (
            <TabsTrigger
              className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
              key={item.value}
              value={item.value}
            >
              {item.label}
            </TabsTrigger>
          ))}
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </TabsList>
      {tabs.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <BlogsLayout arai_label={item.label}>
            <h1 className="font-bold text-primary">{item.label}</h1>
            <div className="py-3">
              {contentData.length <= 0 && (
                <NotFoundPage text_display="Contents not found!" />
              )}
            </div>
            <div className="flex flex-col gap-4">
              {contentData.map((item: ContentsTypeProps) => (
                <ContentCard
                  content={item.content}
                  uuid={item.uuid}
                  category={item.category}
                  id={item.id}
                  author={item.author}
                  date_post={item.date_post}
                  key={item.id}
                  minute_read={item.minute_read}
                  view={item.view}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              ))}
            </div>
          </BlogsLayout>
        </TabsContent>
      ))}
    </Tabs>
  );
}
