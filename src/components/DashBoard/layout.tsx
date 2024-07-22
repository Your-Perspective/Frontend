"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, Home, Menu, Package, Package2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import logo from "@/assets/logo.jpg";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html>
      <body>
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
                    <Home className="h-4 w-4" />
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
                    <Users className="h-4 w-4" />
                    Banner
                  </Link>
                </nav>
              </div>
              <div className="p-4">
                <Card x-chunk="dashboard-02-chunk-0">
                  <CardHeader className="p-2 pt-0 md:p-4">
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 justify-end items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
                      <Home className="h-4 w-4" />
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
                      <Users className="h-4 w-4" />
                      Banner
                    </Link>
                  </nav>
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>
                          Unlock all features and get unlimited access to our
                          support team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button size="sm" className="w-full">
                          Upgrade
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
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
      </body>
    </html>
  );
}
