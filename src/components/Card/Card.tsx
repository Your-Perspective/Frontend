"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { MdOutlineUpdate } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { DateFunction } from "@/constrain/DateFunction";
import { HandleImage } from "@/constrain/HandleImage";
import { BlogsProps, Option } from "@/types/Types";
import { isBlog } from "../Tabs/Tabs";

export default function ContentCard({
  props,
  option,
}: {
  props: BlogsProps;
  option: Option;
}) {
  const handleSummeryCharacters = (summary: string): string[] => {
    const summaryChunks: string[] = [];
    for (let i = 0; i < summary.length; i += 20) {
      summaryChunks.push(summary.slice(i, i + 12));
    }
    return summaryChunks;
  };

  if (isBlog(props)) {
    const handleRoute = () => {
      if (typeof window !== "undefined") {
        window.location.href = `/pages/blogs/${props.author.userName}/${props.slug}`;
      }
    };

    return (
      <Card
        onClick={handleRoute}
        aria-labelledby={props.slug}
        className="rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer hover:bg-slate-100 px-2"
      >
        <CardContent
          className={`${
            option.option?.includes("grid")
              ? "grid grid-cols-3"
              : "flex flex-col"
          } gap-5 py-5 px-0 md:items-center items-start`}
        >
          <div
            className={`col-span-2 flex flex-col gap-4 ${
              option.option?.includes("grid") ? "order-1 md:w-[95%]" : "order-2"
            }`}
          >
            <h3
              className={`font-medium ${
                option.option?.includes("grid")
                  ? "md:text-xl text-base"
                  : "text-base"
              }`}
            >
              {props.blogTitle}
            </h3>
            <p
              className={`text-gray-500 ${
                option.option?.includes("grid")
                  ? "lg:text-base text-xs"
                  : "text-sm md:text-clip"
              }`}
            >
              {handleSummeryCharacters(props.summary)}...
            </p>
            <div
              className={`flex flex-wrap gap-2 items-center text-gray-500 ${
                option.option?.includes("grid")
                  ? "lg:text-base text-sm"
                  : "text-xs"
              }`}
            >
              <div className="flex justify-center items-center gap-2">
                <Image
                  priority
                  src={HandleImage({ src: props.author?.profileImage || "" })}
                  alt={props.blogTitle}
                  width={20}
                  height={20}
                  className="object-cover w-[20px] h-[20px] rounded-full"
                />
                <p className="capitalize font-medium text-primaryColor">
                  {props.author?.userName || ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineUpdate /> {DateFunction({ date: props.createdAt })}
              </div>
              <div className="flex items-center gap-3">
                <IoEye /> {props.countViewer}
              </div>
            </div>
          </div>
          <Image
            priority
            width={200}
            height={100}
            src={HandleImage({ src: props.thumbnail })}
            className={`${
              option.option?.includes("grid")
                ? "md:h-[200px] h-[100px] order-2 w-[250px] mx-auto"
                : "lg:h-[150px] md:h-[200px] h-[250px] order-1"
            } col-span-1 object-cover rounded-lg w-full`}
            alt={props.blogTitle}
          />
        </CardContent>
      </Card>
    );
  }

  const handleAdsRoute = () => {
    if (typeof window !== "undefined") {
      window.open(`${props.link}`, "_blank");
    }
  };

  return (
    <Card
      onClick={handleAdsRoute}
      key={props.id}
      aria-labelledby={props.title}
      className="rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer hover:bg-slate-100"
    >
      <CardContent
        className={`${
          option.option !== "grid" ? "grid" : "flex flex-col"
        } gap-5 py-5 px-0 md:items-center items-start`}
      >
        <Image
          priority
          unoptimized={true}
          width={200}
          height={100}
          src={HandleImage({ src: props.imageUrl })}
          className={`${
            option.option?.includes("grid")
              ? " md:h-[270px] h-[200px] order-2 w-[250px] mx-auto"
              : " lg:h-[150px] md:h-[200px] h-[250px] order-1"
          } col-span-1 object-cover w-full`}
          alt={props.title}
        />
      </CardContent>
    </Card>
  );
}