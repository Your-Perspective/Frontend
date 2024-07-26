"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ExtendedContentsTypeProps } from "@/types/Types";
import Image from "next/image";
import { MdOutlineUpdate } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { DateFunction } from "@/constrain/DateFunction";
import { HandleImage } from "@/constrain/HandleImage";

export default function ContentCard({
  thumbnail,
  slug,
  summary,
  blogTitle,
  countViewer,
  author,
  createdAt,
  minRead,
  published,
  option = "grid",
}: ExtendedContentsTypeProps) {
  const handleRoute = () => {
    if (window !== undefined) {
      window.location.href = `/pages/blogs/${author.userName}/${slug}`;
    }
  };

  return (
    <Card
      onClick={handleRoute}
      key={slug}
      className="rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer"
    >
      <CardContent
        className={`${
          option.includes("grid") ? "grid grid-cols-3" : "flex flex-col"
        } gap-5 py-5 px-0 md:items-center items-start`}
      >
        <Image
          priority
          width={300}
          height={100}
          src={HandleImage({ src: thumbnail })}
          className={`${
            option.includes("grid")
              ? "md:h-[200px] h-[100px]"
              : "md:h-[150px] h-[200px]"
          } col-span-1 object-cover rounded-lg w-full`}
          alt="title"
        />
        <div className="col-span-2 flex flex-col gap-4">
          <h3
            className={`font-medium ${
              option.includes("grid") ? "text-xl" : "text-base"
            }`}
          >
            {blogTitle}
          </h3>
          <p
            className={`text-gray-500 ${
              option.includes("grid") ? "text-base" : "text-sm"
            }`}
          >
            {summary}
          </p>
          <div
            className={`flex flex-wrap gap-4 items-center text-gray-500 ${
              option.includes("grid") ? "md:text-lg text-base" : "text-xs"
            }`}
          >
            <p className="capitalize font-medium">{author.userName}</p>
            <div className="flex items-center gap-3">
              <MdOutlineUpdate /> {DateFunction({ date: createdAt })}
            </div>
            <div className="flex items-center gap-3">
              <IoEye /> {countViewer}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
