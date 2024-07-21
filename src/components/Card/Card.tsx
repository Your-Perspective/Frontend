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
  const handleSummeryCharacters = (summary: string): string[] => {
    const summaryChunks = [];
    for (let i = 0; i < summary.length; i += 20) {
      summaryChunks.push(summary.slice(i, i + 12));
    }
    return summaryChunks;
  };

  const handleRoute = () => {
    if (window !== undefined) {
      window.location.href = `/pages/blogs/${author.userName}/${slug}`;
    }
  };

  return (
    <Card
      onClick={handleRoute}
      key={slug}
      aria-labelledby={slug}
      className="rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer hover:bg-slate-100 px-2"
    >
      <CardContent
        className={`${
          option.includes("grid") ? "grid grid-cols-3" : "flex flex-col"
        } gap-5 py-5 px-0 md:items-center items-start`}
      >
        <div
          className={`col-span-2 flex flex-col gap-4 ${
            option.includes("grid") ? "order-1 md:w-[95%]" : "order-2"
          }`}
        >
          <h3
            className={`font-medium ${
              option.includes("grid") ? "md:text-xl text-base" : "text-base"
            }`}
          >
            {blogTitle}
          </h3>
          <p
            className={`text-gray-500 ${
              option.includes("grid")
                ? "lg:text-base text-xs"
                : "text-sm md:text-clip"
            }`}
          >
            {handleSummeryCharacters(summary)}...
          </p>
          <div
            className={`flex flex-wrap gap-2 items-center text-gray-500 ${
              option.includes("grid") ? "lg:text-base text-sm" : "text-xs"
            }`}
          >
            <p className="capitalize font-medium text-primaryColor">
              @{author.userName}
            </p>
            <div className="flex items-center gap-3">
              <MdOutlineUpdate /> {DateFunction({ date: createdAt })}
            </div>
            <div className="flex items-center gap-3">
              <IoEye /> {countViewer}
            </div>
          </div>
        </div>
        <Image
          priority
          width={200}
          height={100}
          src={HandleImage({ src: thumbnail })}
          className={`${
            option.includes("grid")
              ? "md:h-[200px] h-[100px] order-2 w-[250px] mx-auto"
              : "lg:h-[150px] md:h-[200px] h-[250px] order-1"
          } col-span-1 object-cover rounded-lg w-full`}
          alt="title"
        />
      </CardContent>
    </Card>
  );
}
