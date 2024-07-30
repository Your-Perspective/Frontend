import { useGetRecentPostQuery } from "@/lib/api/services/AllBlogs";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useGetPopularCategoriesQuery } from "@/lib/api/services/AllTabs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useGetTopAuthorsQuery } from "@/lib/api/services/Author";
import AuthorAboutDialog from "../Alert/AuthorAbout";
import { handleSummeryCharacters } from "../Card/Card";

export default function BlogsLayout({
  children,
  arai_label,
}: Readonly<{
  children: React.ReactNode;
  arai_label?: string;
}>) {
  const { data, isLoading, error } = useGetPopularCategoriesQuery();
  const {
    data: RecentPostData,
    isLoading: LoadingRecentPost,
    error: RecentPost,
  } = useGetRecentPostQuery();

  const {
    data: TopAuthor,
    isLoading: LoadingTopAuthors,
    error: TopAuthorsError,
  } = useGetTopAuthorsQuery();

  const router = useRouter();
  const handleCategories = (categorySlug: string) => {
    router.push(`/pages/blogs/category/${categorySlug}`);
  };

  return (
    <section
      aria-label={arai_label}
      className="grid lg:grid-cols-4 grid-cols-1 gap-5 mx-auto my-5"
    >
      <div className="md:col-span-3 col-span-3 w-full">
        <ScrollArea className="w-full rounded-md h-[120vh] relative">
          {children}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="sticky top-0 z-10 lg:col-span-1 col-span-3">
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
                  <p className="capitalize truncate w-44">
                    {item.author.userName}
                  </p>
                  <p className="text-xs">{item.timeAgo}</p>
                </div>
                <p className="my-1 text-sm">{handleSummeryCharacters(item.blogTitle)}...</p>
              </Link>
            </li>
          ))}
        </ul>
        <Button className="w-full" variant={"default"} asChild>
          <Link href={"/pages/blogs/category/all"}>All Posted</Link>
        </Button>
        {TopAuthor && <h3 className="font-medium mt-4">Top Authors</h3>}
        <div className="flex flex-col gap-2 mt-3">
          {TopAuthor?.slice(0, 4).map((item, index) => (
            <AuthorAboutDialog
              key={item.username + index}
              username={item.username}
            >
              <div
                key={item.username + index}
                className="flex justify-start items-center gap-3"
              >
                <Image
                  src={item.profileImage}
                  width={50}
                  height={50}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                  alt={item.username + item.totalViews}
                />
                <div className="text-left">
                  <p className="capitalize font-medium ">{item.username}</p>
                  <p className="text-gray-500">
                    {item.totalViews &&
                      "View hits: " + item.totalViews + " views"}
                  </p>
                </div>
              </div>
            </AuthorAboutDialog>
          ))}
        </div>
        <h3 className="font-medium mt-4">Suggestions</h3>
        <div className="flex flex-wrap gap-2 my-5">
          {data?.map((item) => (
            <Badge
              onClick={() => handleCategories(item.slug)}
              key={item.id}
              className="capitalize px-5 py-2 rounded-full text-sm dark:text-gray-300 dark:hover:text-black hover:text-white cursor-pointer text-gray-700 dark:bg-secondary bg-white"
            >
              {item.title}
            </Badge>
          ))}
        </div>
      </div>
      <div className="col-span-1">{/* Other content */}</div>
    </section>
  );
}
