"use client";
import { Contents } from "@/constrain/Contents";
import { ContentsTypeProps } from "@/types/Types";
import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdOutlineUpdate } from "react-icons/md";
import profile from "@/assets/logo.jpg";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BlogDetail({ uuid }: { uuid: string }) {
  const [content, setContentByUuid] = useState<ContentsTypeProps>();

  useEffect(() => {
    const contentDetail = Contents.filter((item) => item.uuid === uuid);
    setContentByUuid(contentDetail[0]);
  }, [uuid]);

  return (
    <section>
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{content?.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <h1 className="font-medium">{content?.title}</h1>
          <p className="leading-relax text-gray-500">{content?.description}</p>
          <div className="flex items-center text-primary gap-5">
            <Image
              src={profile}
              alt="autorr-profile"
              width={50}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <strong className="capitalize text-lg">{content?.author}</strong>
              <div className="flex gap-3 text-gray-500">
                <p className="text-gray-500">{content?.category}</p>
                <p className="flex gap-3 items-center">
                  <MdOutlineUpdate size={20} /> {content?.date_post}
                </p>
                <p className="flex gap-3 items-center">
                  <IoEye size={20} />
                  {content?.view}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-primary md:text-lg text-base">
          {content?.content}
        </CardContent>
      </Card>
    </section>
  );
}
