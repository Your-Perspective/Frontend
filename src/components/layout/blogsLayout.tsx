import { useGetRecentPostQuery } from "@/lib/api/services/AllBlogs";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useGetAllCategoriesQuery } from "@/lib/api/services/AllTabs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

export default function BlogsLayout({
  children,
  arai_label,
  classNames,
}: Readonly<{
  children: React.ReactNode;
  arai_label?: string;
  classNames?: string;
}>) {
  const { data, isLoading, error } = useGetAllCategoriesQuery();
  const {
    data: RecentPostData,
    isLoading: LoadingRecentPost,
    error: RecentPost,
  } = useGetRecentPostQuery();

  const router = useRouter();
  const handleCategories = (categorySlug: string) => {
    router.push(`/pages/blogs/category/${categorySlug}`);
  };

  return (
    <section
      aria-label={arai_label}
      className={`grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 mx-auto my-5 ${classNames}`}
    >
      <div className="col-span-3">
        <ScrollArea className="w-full rounded-md h-screen relative">
          {children}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="sticky top-0 z-10 lg:col-span-1 col-span-3">
        {" "}
        <h2 className="font-medium">Recent post</h2>
        <ul className="text-gray-500 mt-3">
          {LoadingRecentPost ?? <p>Loading</p>}
          {RecentPostData?.slice(0, 4).map((item) => (
            <li
              key={item.slug}
              className="hover:text-primary my-2 p-2 border rounded-md"
            >
              <Link href={`/pages/blogs/${item.author.userName}/${item.slug}`}>
                <div className="font-medium flex justify-between items-center">
                  <p className="capitalize">{item.author.userName}</p>
                  <p className="text-xs">{item.timeAgo}</p>
                </div>
                <p className="my-1 text-sm">{item.blogTitle}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Button className="w-full" variant={"default"} asChild>
          <Link href={"/pages/blogs/category/all"}>All Posted</Link>
        </Button>
        <h3 className="font-medium mt-4">Suggestions</h3>
        <div className="flex flex-wrap gap-2 my-5">
          {data?.map((item) => (
            <Badge
              onClick={() => handleCategories(item.slug)}
              key={item.id}
              className="px-5 py-2 rounded-full text-sm dark:text-gray-300 dark:hover:text-black hover:text-white cursor-pointer text-gray-700 dark:bg-secondary bg-white"
            >
              {item.title}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
