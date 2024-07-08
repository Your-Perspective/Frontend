"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FiSearch } from "react-icons/fi";
import { useGetAllBlogsQuery } from "@/lib/api/services/AllBlogs";
import { ContentsTypeProps } from "@/types/Types";

export function ClickToCommand({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: blogs, isLoading, error } = useGetAllBlogsQuery();

  return (
    <>
      <Button
        onClick={() => setOpen((e) => !e)}
        className="w-full rounded-full bg-gray-300/40 flex gap-5 items-center text-black hover:text-white dark:text-gray-300 dark:hover:text-black"
      >
        <FiSearch /> Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type your interesting services ...." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup itemScope={true} heading="Blogs">
            {blogs?.map((item: ContentsTypeProps) => (
              <CommandItem
                className={"font-normal opacity-100 grid gap-1 justify-start"}
                key={item.slug}
                onSelect={() => {
                  setOpen((e) => !e);
                  router.push(
                    `/pages/blogs/${item.author.userName}/${item.slug}`
                  );
                }}
              >
                <p className="text-base font-medium">{item.blogTitle}</p>
                <p>{item.summary}</p>
              </CommandItem>
            ))}
            <CommandSeparator />
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
