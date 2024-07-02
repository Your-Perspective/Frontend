"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "@radix-ui/react-icons";
import { Contents, tabs } from "@/constrain/Contents";
import ContentCard from "../Card/Card";
import { ContentsTypeProps } from "@/types/Types";
import BlogsLayout from "../layout/blogsLayout";

export default function TabsGategory() {
  const [category, setCategory] = useState<string>("foryou");
  const [contentData, setContentData] = useState<ContentsTypeProps[]>([]);

  const onTabChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    const filteredContents = Contents.filter(
      (item) => item.category === category
    );
    setContentData(filteredContents);
  }, [category]);

  return (
    <Tabs value={category} onValueChange={onTabChange} className="py-3">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent dark:bg-0 p-0">
        {tabs.map((item) => (
          <TabsTrigger
            className="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none "
            key={item.value}
            value={item.value}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((item) => (
        <TabsContent key={item.value} value={item.value} className="py-5">
          <BlogsLayout>
            <h2 className="font-medium">Blogs</h2>
            <div className="py-3">
              {contentData.length <= 0 && (
                <p>Not found blogs of this category</p>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {contentData.map((item: ContentsTypeProps) => (
                <ContentCard
                  uuid={item.uuid}
                  category={item.category}
                  id={item.id}
                  author={item.author}
                  date_post={item.date_post}
                  key={item.id}
                  like={item.like}
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
