"use client";
import { useGetRecentPostQuery } from "@/lib/api/services/AllBlogs";
import { Badge } from "../ui/badge";
import { useGetPopularCategoriesQuery } from "@/lib/api/services/AllTabs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useGetTopAuthorsQuery } from "@/lib/api/services/Author";
import AuthorAboutDialog from "../Alert/AuthorAbout";
import { useGetBannersQuery } from "@/lib/api/services/BannerApi";
import { showBanners, splitBanners } from "../layout/BlogDetail";
import { useGetCurrentUserQuery } from "@/lib/api/auth/profile";
import { HandleImage } from "@/constrain/HandleImage";
import { useDispatch } from "react-redux";
import { logOut } from "@/lib/api/auth/authSlice";
import { useCallback, useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { GetAuthByRoles } from "@/constrain/AuthByRole";
import { useAppSelector } from "@/lib/hooks";

export default function SidebarLayout({ classNames }: { classNames?: string }) {
  const token = useAppSelector((state) => state.auth.accessToken);
  const [isAdmin, setAdmin] = useState<Boolean>(false);

  const { data: CurrentUser } = useGetCurrentUserQuery();

  const { data, isLoading } = useGetPopularCategoriesQuery();

  const router = useRouter();
  const dispath = useDispatch();
  const pathname = usePathname();

  const { data: Banners } = useGetBannersQuery();
  const { data: RecentPostData, isLoading: LoadingRecentPost } =
    useGetRecentPostQuery();
  const { data: TopAuthor } = useGetTopAuthorsQuery();

  const handleRoute = (route: string) => {
    return route;
  };

  const handleCategories = (categorySlug: string) => {
    if (typeof window !== "undefined") {
      window.open(`/pages/blogs/category/${categorySlug}`, "_blank");
    }
  };

  const { firstPart, secondPart } = splitBanners(Banners);

  const handleLogout = useCallback(() => {
    dispath(logOut());
    if (typeof window !== "undefined") {
      window.location.href = "/pages/auth-form/login";
    }
  }, [dispath]);

  const handleGotoDashboard = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/pages/admin";
    }
  };

  const handleRouteToLogin = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/pages/auth-form/login";
    }
  };

  useEffect(() => {
    const GetAuthAdminRole = async () => {
      const { isAuthorized } = await GetAuthByRoles({
        token: token,
        role: ["ADMIN"],
      });
      setAdmin(isAuthorized);
    };

    if (token) {
      GetAuthAdminRole();
    }
  }, [token]);

  return (
    <section className={classNames}>
      {CurrentUser ? (
        <div className="flex justify-start items-start gap-3 py-5">
          <Image
            src={HandleImage({ src: CurrentUser.profileImage })}
            width={50}
            height={50}
            className="w-[40px] h-[40px] rounded-full object-cover"
            alt={CurrentUser.userName}
          />
          <div className="text-left flex flex-col justify-start items-start">
            <p className="capitalize font-medium ">{CurrentUser.userName}</p>
            <Button
              variant={"link"}
              onClick={handleLogout}
              className="p-0 text-primaryColor"
            >
              Logout
            </Button>
            {isAdmin && (
              <Button
                variant={"link"}
                onClick={handleGotoDashboard}
                className="p-0"
              >
                Go to dashbord
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Button
          onClick={handleRouteToLogin}
          disabled={isLoading}
          className="my-5 w-full bg-gradient-to-r from-blue-950 to-primaryColor dark:text-white"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      )}
      {RecentPostData && (
        <div>
          <h2 className="font-medium">Recent post</h2>
          <ul className="text-gray-500 mt-3">
            {LoadingRecentPost ?? <p>Loading</p>}
            {RecentPostData?.slice(0, 4).map((item) => (
              <li
                key={item.slug}
                className="hover:text-primary my-2 p-2 border rounded-md"
              >
                <Link
                  href={handleRoute(
                    `/pages/blogs/${item.author.userName}/${item.slug}`
                  )}
                  target="_blank"
                >
                  <div className="font-medium flex justify-between items-center">
                    <p className="capitalize truncate w-44">
                      {item.author.userName}
                    </p>
                    <p className="text-xs">{item.timeAgo}</p>
                  </div>
                  <p className="my-1 text-sm">{item.blogTitle}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Button
            className="w-full"
            variant={"default"}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/pages/blogs/category/all";
              }
            }}
          >
            All Posted
          </Button>
        </div>
      )}
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
                alt={item.username + item.formattedTotalCountViewer}
              />
              <div className="text-left">
                <p className="capitalize font-medium ">{item.username}</p>
                <p className="text-gray-500">
                  {item.formattedTotalCountViewer &&
                    "View hits: " + item.formattedTotalCountViewer + " views"}
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
      {pathname.startsWith("/pages") && Banners && Banners?.length > 0 && (
        <section>
          <h3 className="font-medium">Sponsors</h3>
          {firstPart && showBanners(0, firstPart.length, Banners)}
          {secondPart &&
            showBanners(firstPart?.length ?? 0, Banners?.length, Banners)}
        </section>
      )}
    </section>
  );
}
