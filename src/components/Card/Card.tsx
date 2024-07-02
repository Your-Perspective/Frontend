"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ContentsTypeProps } from "@/types/Types";
import Image from "next/image";
import React from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function ContentCard({
  uuid,
  id,
  category,
  image,
  author,
  title,
  description,
  date_post,
  view,
  like,
}: ContentsTypeProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/pages/blogs/${uuid}`)}
      key={id}
      className="rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer"
    >
      <CardContent className="flex md:flex-row flex-col gap-5 py-5 px-0">
        <Image
          src={image}
          className="md:w-[500px] w-full h-[200px] object-cover col-span-1 rounded-lg"
          alt="title"
        />
        <div className="col-span-2 flex flex-col gap-4">
          <small className="capitalize">Author: {author}</small>
          <h3 className="font-medium">{title}</h3>
          <p className="text-gray-500 text-lg">{description}</p>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-3">
              <MdOutlineUpdate /> {date_post}
            </div>
            <div className="flex items-center gap-3">
              <IoEye /> {view}
            </div>
            <div className="flex items-center gap-3">
              <AiOutlineLike /> {like}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
