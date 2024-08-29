"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { MdOutlineUpdate } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { HandleImage } from "@/constrain/HandleImage";
import { BlogsProps, Option } from "@/types/Types";
import { isBlog } from "../Tabs/Tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDeleteBlogMutation } from "@/lib/api/services/Author";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const handleSummeryCharacters = (summary: string): string[] => {
  const summaryChunks: string[] = [];
  for (let i = 0; i < summary.length; i += 20) {
    summaryChunks.push(summary.slice(i, 60));
  }
  return summaryChunks;
};

export default function ContentCard({
  props,
  option,
  editable = false,
}: {
  props: BlogsProps;
  option: Option;
  editable?: Boolean;
}) {
  const [DeleteBlog, { isLoading: isBlogDeleting }] = useDeleteBlogMutation();
  const router = useRouter();

  if (isBlog(props)) {
    const handleRoute = () => {
      if (typeof window !== "undefined") {
        window.location.href = `/pages/blogs/${props.author.userName}/${props.slug}`;
      }
    };

    const handleDeleteBlog = async () => {
      try {
        const deleteBlog = await DeleteBlog(props.id);
        if (isBlogDeleting) {
          toast.loading("Blog deleting...");
        }
        toast.success("Blog deleted");
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    return (
      <Card
        title={props.blogTitle}
        onClick={() => {
          if (!editable) {
            handleRoute();
          }
        }}
        aria-label={props.blogTitle}
        className="transition-all rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer dark:hover:bg-white/5 hover:bg-slate-100 px-1"
      >
        <CardContent
          className={`${
            option.option?.includes("grid")
              ? "grid grid-cols-3"
              : "flex flex-col"
          } gap-3 py-3 px-0 items-start`}
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
              className={`text-left text-gray-500 ${
                option.option?.includes("grid")
                  ? "lg:text-base text-xs"
                  : "text-sm md:text-clip"
              }`}
            >
              {handleSummeryCharacters(props.summary)}...
            </p>
          </div>
          <div
            className={`relative col-span-1 object-cover rounded-lg w-full ${
              option.option?.includes("grid") ? "order-2" : "order-1"
            }`}
          >
            <Image
              priority
              width={200}
              height={100}
              src={HandleImage({ src: props.thumbnail })}
              alt={props.blogTitle}
              className={`${
                option.option?.includes("grid")
                  ? "md:h-[200px] h-[100px] w-[250px] mx-auto"
                  : "lg:h-[150px] md:h-[200px] h-[250px]"
              } col-span-1 object-cover rounded-lg w-full`}
            />
            {editable && (
              <div className="absolute top-1 right-1">
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-white p-2 rounded-md">
                    <BsThreeDotsVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `/pages/writer/${props.author.userName}/${props.slug}`
                        )
                      }
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleRoute}>
                      View detail
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDeleteBlog}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter
          className={`px-0 flex flex-wrap gap-2 items-center text-gray-500 ${
            option.option?.includes("grid") ? "lg:text-base text-sm" : "text-xs"
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
          <div className="flex items-center gap-1">
            <MdOutlineUpdate /> {props.createdAt}
          </div>
          <div className="flex items-center gap-1">
            <IoEye /> {props.formattedCountViewer}
          </div>
        </CardFooter>
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
      title={props.title}
      onClick={handleAdsRoute}
      key={props.id}
      aria-label={props.title}
      className={`rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer hover:bg-slate-100 ${
        option.option?.includes("column") &&
        "lg:col-span-2 md:col-span-3 h-auto"
      }`}
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
              : " order-1"
          } col-span-1 object-cover w-full`}
          alt={props.title}
        />
      </CardContent>
    </Card>
  );
}
