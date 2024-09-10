"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import { ThemesModeToggle } from "../darkmode-switcher/ThemesSwitcher";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { TbSlideshow } from "react-icons/tb";
import { TbLogin } from "react-icons/tb";
import { useCallback, useEffect, useState } from "react";
import { useGetCurrentUserQuery } from "@/lib/api/auth/profile";
import { useDispatch } from "react-redux";
import { logOut } from "@/lib/api/auth/authSlice";
import { HandleImage } from "@/constrain/HandleImage";
import { removeRefresh } from "@/lib/cryptography";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { GetAuthByRoles } from "@/constrain/AuthByRole";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data,
    isLoading,
    isSuccess,
    error: ProfileError,
  } = useGetCurrentUserQuery();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const pathname = usePathname();
  const links = [
    {
      href: "/pages/admin/user",
      icon: <RiAccountPinCircleLine className="size-4" />,
      text: "User",
      isActive: pathname === "/pages/admin/user",
    },
    {
      href: "/pages/admin/blog",
      icon: <Package className="h-4 w-4" />,
      text: "Blog",
      isActive: pathname === "/pages/admin/blog",
    },
    {
      href: "/pages/admin/banner",
      icon: <TbSlideshow className="size-4" />,
      text: "Banner",
      isActive: pathname === "/pages/admin/banner",
    },
  ];

  const handleLogout = useCallback(() => {
    dispatch(logOut());
    if (typeof window !== "undefined") {
      window.location.href = "/pages/auth-form/login";
    }
    removeRefresh();
  }, [dispatch]);

  useEffect(() => {
    async function checkAuthorization() {
      const { isAuthorized, loading } = await GetAuthByRoles({
        token: token.accessToken,
        role: ["ADMIN"],
      });

      setIsAuthenticated(isAuthorized);
      setLoading(loading);
    }

    if (token.accessToken) {
      checkAuthorization();
    } else {
      setLoading(false);
    }
  }, [router, token, token.accessToken]);

  if (isLoading || loading) {
    return <Loading />;
  }

  if (isAuthenticated && isSuccess) {
    return (
      <section>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="sticky top-0 h-screen border-r bg-muted/40 hidden md:block">
            <div className="flex flex-col gap-2 h-full overflow-hidden">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Image
                  priority
                  width={40}
                  src={logo}
                  alt="your-perspective-logo"
                  className="rounded-full"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        link.isActive
                          ? "text-primary bg-muted"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.icon}
                      {link.text}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="text-sm font-medium p-4">
                <div>
                  <Button
                    variant={"ghost"}
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary"
                  >
                    <TbLogin className="size-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <header className="flex h-14 justify-between items-center gap-4 border-b bg-muted/40 px-4 md:justify-end sm:justify-between lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Image
                      priority
                      width={40}
                      src={logo}
                      alt="your-perspective - logo"
                      className="rounded-full"
                    />

                    {links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                          link.isActive
                            ? "text-primary bg-muted"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {link.icon}
                        {link.text}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <Image
                        width={25}
                        height={25}
                        priority
                        src={HandleImage({ src: data.profileImage })}
                        alt="profile"
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{data.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/")}>
                      Homepage
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ThemesModeToggle />
              </div>
            </header>
            <section className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto">
              {children}
            </section>
          </div>
        </div>
      </section>
    );
  }
}
