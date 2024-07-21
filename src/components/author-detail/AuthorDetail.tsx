"use client";

import { HandleImage } from "@/constrain/HandleImage";
import { useGetAuthorAboutQuery } from "@/lib/api/services/Author";
import Image from "next/image";
import { AuthorStarShow } from "../Alert/AuthorAbout";
import Loading from "@/app/loading";
import NotFoundPage from "@/app/not-found";

export default function AuthorDetail({ username }: { username: string }) {
  const {
    data: AuthorDetail,
    isSuccess,
    isLoading,
    error,
  } = useGetAuthorAboutQuery(username);

  if (isLoading) {
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
        <aside className="flex flex-col md:col-span-1 col-span-3 p-5 rounded-xl gap-4">
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
        <section className="md:col-span-2 col-span-3 p-5">Blogs posted</section>
      </section>
    );
}
