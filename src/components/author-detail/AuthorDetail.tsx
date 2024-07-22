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
          <div className="flex justify-start items-center gap-5">
            <Image
              width={100}
              height={100}
              className={"w-[100px] h-[100px] object-cover rounded-full"}
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
              <p className="text-primary md:text-lg">
                View hits:{" "}
                <span className="text-primaryColor font-medium">
                  {AuthorDetail.totalViews}
                </span>
              </p>
            )}
          </div>
          <article>{AuthorDetail.bio}</article>
        </aside>
        <section className="md:col-span-2 col-span-3 p-5">
          <div className="flex justify-between items-center py-3 border-b-2">
            <p className="font-medium md:text-lg">All posts</p>
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
                {BlogByAuthor?.map((author) => (
                  <ContentCard
                    option={style}
                    key={author.id}
                    blogTitle={author.blogTitle}
                    createdAt={author.createdAt}
                    countViewer={author.countViewer}
                    thumbnail={HandleImage({ src: author.thumbnail })}
                    slug={author.slug}
                    summary={author.summary}
                    author={{ userName: username }}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </section>
      </section>
    );
}
