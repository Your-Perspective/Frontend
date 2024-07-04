"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ContentsTypeProps } from "@/types/Types";
import Image from "next/image";
import React from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { BiBook } from "react-icons/bi";

export default function ContentCard({
  uuid,
  id,
  category,
  content,
  image,
  author,
  title,
  description,
  date_post,
  view,
  minute_read,
}: ContentsTypeProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/pages/blogs/${uuid}`)}
      key={id}
      className="rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer"
    >
      <CardContent className="grid grid-cols-3 gap-5 py-5 px-0 md:items-center items-start">
        <Image
          src={image}
          className="col-span-1 md:h-[200px] h-[100px] object-cover rounded-lg"
          alt="title"
        />
        <div className="col-span-2 flex flex-col gap-4">
          <h3 className="font-medium">{title}</h3>
          <p className="text-gray-500 md:text-lg text-sm">{description}</p>
          <div className="flex flex-wrap gap-4 items-center text-gray-500">
            <p className="capitalize md:text-lg text-sm">{author}</p>
            <div className="flex items-center gap-3 md:text-lg text-sm">
              <MdOutlineUpdate /> {date_post}
            </div>
            <div className="flex items-center gap-3">
              <IoEye /> {view}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
