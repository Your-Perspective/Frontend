import React from "react";
import { Badge } from "../ui/badge";
import { SuggestionCategories } from "@/constrain/Contents";

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mx-auto">
      <div className="col-span-2">{children}</div>
      <div className="col-span-1">
        <h2 className="font-medium">Recent post</h2>
        <p className="text-gray-500 mt-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel ut
          consequuntur modi quia unde vero aliquam pariatur ea, deleniti
          aspernatur, fuga omnis velit, recusandae odio molestiae repellendus
          est officiis! A.
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
    </div>
  );
}
