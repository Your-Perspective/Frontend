import React from "react";
import { Badge } from "../ui/badge";
import { SuggestionCategories } from "@/constrain/Contents";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function BlogsLayout({
  children,
  arai_label,
  classNames
}: Readonly<{
  children: React.ReactNode;
  arai_label?: string;
  classNames?: string;
}>) {
  return (
    <section
      aria-label={arai_label}
      className={`grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 mx-auto my-5 ${classNames}`}
    >
      <div className="col-span-3">
        <ScrollArea className="w-full rounded-md h-screen relative">
          <div className="max-h-screen">{children}</div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
      <div className="sticky top-0 z-10 col-span-1">
        {" "}
        <h2 className="font-medium">Recent post</h2>
        <p className="text-gray-500 mt-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel ut
          consequuntur modi quia unde vero aliquam pariatur ea.
        </p>
        <h3 className="font-medium mt-4">Suggestions</h3>
        <div className="flex flex-wrap gap-2 my-5">
          {SuggestionCategories.map((item) => (
            <Badge
              key={item.id}
              className="px-5 py-2 rounded-full text-sm dark:text-gray-300 dark:hover:text-black hover:text-white cursor-pointer text-gray-700 dark:bg-secondary bg-white"
            >
              {item.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
