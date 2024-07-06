"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ContentsTypeProps } from "@/types/Types";
import Image from "next/image";
import React from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";

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
}: ContentsTypeProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/pages/blogs/${slug}`)}
      key={slug}
      className="rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer"
    >
      <CardContent className="grid grid-cols-3 gap-5 py-5 px-0 md:items-center items-start">
        <Image
          src={thumbnail}
          className="col-span-1 md:h-[200px] h-[100px] object-cover rounded-lg"
          alt="title"
        />
        <div className="col-span-2 flex flex-col gap-4">
          <h3 className="font-medium">{blogTitle}</h3>
          <p className="text-gray-500 md:text-lg text-sm">{summary}</p>
          <div className="flex flex-wrap gap-4 items-center text-gray-500">
            <p className="capitalize md:text-lg text-sm">{author.userName}</p>
            <div className="flex items-center gap-3 md:text-lg text-sm">
              <MdOutlineUpdate /> {published}
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
