"use client";

import {
  Command,
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
import { BlogsProps, ContentsTypeProps } from "@/types/Types";
import { isBlog } from "../Tabs/Tabs";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription } from "../ui/dialog";
import { handleSummeryCharacters } from "../Card/Card";

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

  const handleSelect = (item: ContentsTypeProps) => {
    setOpen(false);
    router.push(`/pages/blogs/${item.author.userName}/${item.slug}`);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Command>
        <Button
          onClick={() => setOpen((e) => !e)}
          className="w-full rounded-full bg-gray-300/40 flex gap-5 items-center text-black hover:text-white dark:text-gray-300 dark:hover:text-black"
        >
          <FiSearch /> Search
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput autoFocus={false} placeholder="Type your interesting services ...." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup itemScope={true} heading="Blogs">
              {blogs?.map((item: BlogsProps) => {
                if (isBlog(item)) {
                  return (
                    <CommandItem
                      className="font-normal opacity-100 grid gap-1 justify-start"
                      key={item.slug}
                      onSelect={() => handleSelect(item)}
                    >
                      <DialogTitle className="text-base font-medium">
                        {item.blogTitle}
                      </DialogTitle>
                      <DialogDescription>
                        {handleSummeryCharacters(item.summary)}...
                      </DialogDescription>
                    </CommandItem>
                  );
                }
              })}
              <CommandSeparator />
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </>
  );
}
