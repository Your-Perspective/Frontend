"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, Menu, Package } from "lucide-react";
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
import { RiAccountPinCircleLine } from "react-icons/ri";
import { TbSlideshow } from "react-icons/tb";
import { TbLogin } from "react-icons/tb";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Image
                priority
                width={40}
                src={logo}
                alt="your-perspective - logo"
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/pages/admin/user"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    pathname === "/pages/admin/user"
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <RiAccountPinCircleLine className="size-4" />
                  User
                </Link>
                <Link
                  href="/pages/admin/blog"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    pathname === "/pages/admin/blog"
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  Blog
                </Link>
                <Link
                  href="/pages/admin/banner"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    pathname === "/pages/admin/banner"
                      ? "text-primary bg-muted"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <TbSlideshow className="size-4" />
                  Banner
                </Link>
              </nav>
            </div>
            <div className="text-sm font-medium p-4">
              <div>
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary"
                >
                  <TbLogin className="size-4" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
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

                  <Link
                    href="/pages/admin/user"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      pathname === "/pages/admin/user"
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <RiAccountPinCircleLine className="size-5" />
                    User
                  </Link>
                  <Link
                    href="/pages/admin/blog"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      pathname === "/pages/admin/blog"
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Package className="size-5" />
                    Blog
                  </Link>
                  <Link
                    href="/pages/admin/banner"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      pathname === "/pages/admin/banner"
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <TbSlideshow className="size-5" />
                    Banner
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
