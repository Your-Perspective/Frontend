"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import logo from "@/assets/logo.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bell, LineChart, Package, Package2, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Menu() {
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
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex py-2 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={"/"} className="min-w-[55px]">
            <Image
              priority
              width={40}
              src={logo}
              alt="your-perspective - logo"
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
              User
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
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
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
  );
}
