"use client";

import { HandleImage } from "@/constrain/HandleImage";
import {
  useGetAuthorAboutQuery,
  useGetBlogByAuthorQuery,
} from "@/lib/api/services/Author";
import Image from "next/image";
import { AuthorStarShow } from "../Alert/AuthorAbout";
import Loading from "@/app/loading";
import NotFoundPage from "@/app/not-found";
import ContentCard from "../Card/Card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useState } from "react";
import { Button } from "../ui/button";
import { BsFillGridFill } from "react-icons/bs";
import { HiViewColumns } from "react-icons/hi2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isBlog } from "../Tabs/Tabs";

export default function AuthorDetail({ username }: { username: string }) {
  const {
    data: AuthorDetail,
    isSuccess,
    isLoading,
    error,
  } = useGetAuthorAboutQuery(username);

  const {
    data: BlogByAuthor,
    isSuccess: blogSuccess,
    isLoading: BlogLoading,
    error: blogError,
  } = useGetBlogByAuthorQuery(username);

  const [style, setStyle] = useState<"column" | "grid" | undefined>("column");

  const handleChange = () => {
    if (style === "column") {
      setStyle("grid");
    } else {
      setStyle("column");
    }
  };

  if (isLoading || BlogLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <NotFoundPage text_display={`author ${username} has not been found`} />
    );
  }

  if (isSuccess)
    return (
      <section
        className="grid lg:grid-cols-3"
        aria-label={`author-detail - ${username}`}
      >
        <aside className="flex flex-col md:col-span-1 col-span-3 p-5 gap-4">
          <div className="flex justify-start items-start gap-5">
            <Image
              width={75}
              height={75}
              className={"w-[75px] h-[75px] object-cover rounded-full"}
              src={HandleImage({ src: AuthorDetail?.profileImage })}
              alt={AuthorDetail?.userName}
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-medium capitalize text-primary">
                {AuthorDetail.userName}
              </h1>
              <div className="flex gap-1 items-center text-xl">
                <AuthorStarShow stars={AuthorDetail.top3Count} />
              </div>
            </div>
          </div>
          <div>
            {AuthorDetail && (
              <p className="text-gray-500 md:text-lg">
                View hits:{" "}
                <span className="text-primaryColor font-medium">
                  {AuthorDetail.formatTotalCountViewer}
                </span>
              </p>
            )}
          </div>
          <article className="text-gray-500">{AuthorDetail.bio}</article>
        </aside>
        <Tabs
          defaultValue="all-post"
          className="w-full md:col-span-2 col-span-3"
        >
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent dark:bg-0 p-0">
            <TabsTrigger
              value="all-post"
              className="relative capitalize rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              All posts
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="relative capitalize rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              About
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all-post">
            <section className="md:col-span-2 col-span-3">
              <div className="flex justify-end items-center">
                <Button
                  className="text-lg text-primary"
                  variant={"link"}
                  onClick={handleChange}
                >
                  {style !== "column" ? <BsFillGridFill /> : <HiViewColumns />}
                </Button>
              </div>
              {blogError && <NotFoundPage text_display="Blogs not found" />}
              {blogSuccess && (
                <ScrollArea className="w-full rounded-md h-screen relative mt-3">
                  <div
                    className={`${
                      style === "column"
                        ? "grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1"
                        : ""
                    }`}
                  >
                    {BlogByAuthor?.map((item, index) => (
                      <ContentCard
                        option={{
                          option: "column",
                        }}
                        props={{ ...item }}
                        key={isBlog(item) ? item.slug : index.toString()}
                    />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </section>
          </TabsContent>
          <TabsContent value="about">
            <div
              className="leading-relaxed text-primary"
              dangerouslySetInnerHTML={{ __html: AuthorDetail.about }}
            />
          </TabsContent>
        </Tabs>
      </section>
    );
}
