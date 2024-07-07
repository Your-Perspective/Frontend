"use client";
import { IoEye } from "react-icons/io5";
import { MdOutlineUpdate } from "react-icons/md";
import profile from "@/assets/logo.jpg";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { BsFacebook } from "react-icons/bs";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { BiLogoTwitter } from "react-icons/bi";
import BreadcrumbCompo from "../Breadcrumb/BreadcrumbCompo";
import { useGetBlogDetailByAuthorSlugQuery } from "@/lib/api/services/AllBlogs";
import { DateFunction } from "@/constrain/DateFunction";

export default function BlogDetail({
  slug,
  username,
}: {
  slug: string;
  username: string;
}) {
  const {
    data: content,
    isLoading,
    error,
  } = useGetBlogDetailByAuthorSlugQuery([slug, username]);

  return (
    <section
      aria-labelledby={content?.blogTitle}
      className={"flex flex-col gap-5"}
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
              src={profile}
              alt="autorr-profile"
              width={50}
              className="rounded-full"
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
          {content?.blogContent}
        </CardContent>
      </Card>
      <Card className={"text-primary shadow-none border-0 my-10"}>
        <CardHeader className="p-0">
          <div className={"flex justify-between items-center"}>
            <h3 className="font-medium">Written by:</h3>
            <div className={"flex gap-3"}>
              <Link href={"#"}>
                <BsFacebook size={25} />
              </Link>
              <Link href={"#"}>
                <AiFillInstagram size={25} />
              </Link>
              <Link href={"#"}>
                <BiLogoTwitter size={25} />
              </Link>
            </div>
          </div>
          <div className="flex items-center text-primary gap-5">
            <Image
              src={profile}
              alt="autorr-profile"
              width={50}
              className="rounded-full"
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
          <div>
            <p>{content?.author.userName}</p>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
}
