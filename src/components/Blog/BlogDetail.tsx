"use client";
import { IoEye } from "react-icons/io5";
import { MdOutlineUpdate } from "react-icons/md";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import BreadcrumbCompo from "../Breadcrumb/BreadcrumbCompo";
import {
  useGetBlogDetailByAuthorSlugQuery,
  useGetRelatedBlogPostsBySlugQuery,
} from "@/lib/api/services/AllBlogs";
import { DateFunction } from "@/constrain/DateFunction";
import NotFoundPage from "@/app/not-found";
import Loading from "@/app/loading";
import { HandleImage } from "@/constrain/HandleImage";
import ContentCard from "../Card/Card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { isBlog } from "../Tabs/Tabs";

export default function BlogDetail({
  slug,
  username,
}: {
  slug: string;
  username: string;
}) {
  const router = useRouter();

  const {
    data: content,
    isLoading,
    error,
  } = useGetBlogDetailByAuthorSlugQuery([username, slug]);

  const {
    data: RelatedPost,
    isLoading: RelatedPostLoading,
    error: RelatedPostError,
  } = useGetRelatedBlogPostsBySlugQuery(username);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section
      aria-labelledby={content?.blogTitle}
      className={"flex flex-col gap-5 my-10"}
    >
      {content?.blogTitle && (
        <BreadcrumbCompo title={[{ label: content?.blogTitle, link: "#" }]} />
      )}
      <Card className="shadow-none border-0">
        <CardHeader className="p-0">
          <h1 className="font-medium">{content?.blogTitle}</h1>
          <p className="leading-relax text-gray-500">{content?.summary}</p>
          <div className="flex items-center text-primary gap-5 py-5">
            <Image
              src={HandleImage({ src: content?.author.profileImage })}
              alt="autorr-profile"
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <div className="flex flex-col gap-1">
              <strong className="capitalize text-lg">
                {content?.author.userName}
              </strong>
              <div className="flex gap-3 text-gray-500">
                <p className="flex gap-3 items-center">
                  <MdOutlineUpdate size={20} />{" "}
                  {DateFunction({ date: content?.createdAt })}
                </p>
                <p className="flex gap-3 items-center">
                  <IoEye size={20} />
                  {content?.countViewer}
                </p>
                <p className="flex items-center gap-3">
                  {content?.minRead} min read
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="border-y-2 border-b-0 text-primary md:text-lg text-base px-0 py-5">
          {content ? (
            <div
              className="leading-relaxed text-primary"
              dangerouslySetInnerHTML={{ __html: content.blogContent }}
            />
          ) : (
            <NotFoundPage text_display="content not found" />
          )}
        </CardContent>
      </Card>
      <Card className={"text-primary shadow-none border-0 my-10"}>
        <CardHeader className="p-0">
          <h3 className="font-medium">Written by:</h3>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-primary gap-5">
                <Image
                  src={HandleImage({ src: content?.author.profileImage })}
                  alt="autorr-profile"
                  width={50}
                  height={50}
                  className="rounded-full w-[50px] h-[50px] object-cover"
                />
                <div className="flex flex-col gap-1">
                  <strong className="capitalize text-lg">
                    {content?.author.userName}
                  </strong>
                  <div className="flex gap-3 text-gray-500">
                    <p className="flex gap-3 items-center">
                      <MdOutlineUpdate size={20} />{" "}
                      {DateFunction({ date: content?.createdAt })}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() =>
                  router.push(
                    `/pages/author-detail/${content?.author.userName}`
                  )
                }
              >
                View profile
              </Button>
            </div>
            <article>{content?.author?.bio}</article>
          </div>
        </CardHeader>
      </Card>
      <section aria-label="related-blogs">
        <h2 className="font-semibold">{RelatedPost ? "Related" : ""}</h2>
        {RelatedPostLoading && <Loading />}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-5">
          {!RelatedPost ||
            (RelatedPost.length === 0 && (
              <NotFoundPage text_display="No related page" />
            ))}
          {RelatedPost?.map((item, index) => (
            <ContentCard
              option={{
                option: "column",
              }}
              props={{ ...item }}
              key={isBlog(item) ? item.slug : index.toString()}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
