"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FiSearch } from "react-icons/fi";
import {Contents} from "@/constrain/Contents";

export function ClickToCommand({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
            {
              Contents.map((item) => (
                <CommandItem
                  className={"font-normal opacity-100"}
                  key={item.uuid}
                  onSelect={() => {
                    setOpen((e) => !e);
                    router.push(`/pages/blogs/${item.uuid}`)
                  }}
                >
                  <span>{item.title}</span>
                </CommandItem>
              ))
            }
            
            
            <CommandSeparator />
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
