"use client";
import React from "react";
import Link from "next/link";

import {
  CircleUser,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  Users,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function MenuPhone() {
  const [activeLink, setActiveLink] = useState<string>("User");

  useEffect(() => {
    const savedActive = localStorage.getItem("activeMenuItem");
    if (savedActive) {
      setActiveLink(savedActive);
    }
  }, []);

  const handleLinkClick = (label: string) => {
    setActiveLink(label);
    localStorage.setItem("activeMenuItem", label);
  };
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href={"/pages/admin/user"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                activeLink === "User"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => handleLinkClick("User")}
            >
              <Package className="h-4 w-4" />
              user{" "}
            </Link>
            <Link
              href={"/pages/admin/blog"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                activeLink === "Blog"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => handleLinkClick("Blog")}
            >
              <Users className="h-4 w-4" />
              Blog
            </Link>
            <Link
              href={"/pages/admin/banner"}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                activeLink === "Banner"
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => handleLinkClick("Banner")}
            >
              <LineChart className="h-4 w-4" />
              Banner
            </Link>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
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
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
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
  );
}
