"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "@radix-ui/react-icons";
import { Contents } from "@/constrain/Contents";
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
      <TabsList>
        <TabsTrigger value="foryou" className="flex gap-3">
          <PlusIcon /> For you
        </TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="alien">Alien</TabsTrigger>
      </TabsList>
      <TabsContent value="foryou" className="py-5">
        <BlogsLayout>
          <h2 className="font-medium">Blogs</h2>
          <div className="py-3">
            {contentData.length <= 0 && <p>Not found blogs of this category</p>}
          </div>
          <div className="flex flex-col gap-4 my-5">
            {contentData.map((item: ContentsTypeProps) => (
              <ContentCard
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
      <TabsContent value="following" className="py-5">
        <BlogsLayout>
          <h2 className="font-medium">Blogs</h2>
          <div className="py-3">
            {contentData.length <= 0 && <p>Not found blogs of this category</p>}
          </div>
          <div className="flex flex-col gap-4 my-5">
            {contentData.map((item: ContentsTypeProps) => (
              <ContentCard
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
      <TabsContent value="alien" className="py-5">
        <BlogsLayout>
          <h2 className="font-medium">Blogs</h2>
          <div className="py-3">
            {contentData.length <= 0 && <p>Not found blogs of this category</p>}
          </div>
          <div className="flex flex-col gap-4 my-5">
            {contentData.map((item: ContentsTypeProps) => (
              <ContentCard
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
    </Tabs>
  );
}
