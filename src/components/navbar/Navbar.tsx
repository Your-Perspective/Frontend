"use client";
import React, { useState, useEffect } from "react";
import { ThemesModeToggle } from "../darkmode-switcher/ThemesSwitcher";
import Container from "../container-section/Container";
import { ClickToCommand } from "../Combobox/Combobox";
import { MdOutlineShoppingBag } from "react-icons/md";
import logo from "@/assets/logo.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarLayout from "../sidbar/Sidebar";
import { BsMenuApp } from "react-icons/bs";
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathName = usePathname();
  const [hide, setHide] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathPrefixes = ["/pages/admin/", "/pages/auth-form/"];
  const startsWithAnyPrefix = pathPrefixes.some((prefix) =>
    pathName.startsWith(prefix)
  );

  useEffect(() => {
    if (startsWithAnyPrefix) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [pathName, startsWithAnyPrefix]);

  return (
    <nav
      className={hide ? "hidden" : "py-4 px-0 sticky top-0 z-40 bg-background"}
    >
      <Container classNames="flex justify-between items-center md:gap-10 gap-3">
        <Link href="/" title="your-perspective logo">
          <Image
            aria-label="your-perspective logo"
            title="logo"
            priority
            width={45}
            height={45}
            src={logo}
            alt="your-perspective - logo"
            className="rounded-full min-w-9 object-cover mx-auto"
          />
        </Link>
        <ClickToCommand />
        <div className="flex md:gap-3 gap-2 items-center">
          <Button variant={"link"} className="relative hidden" asChild>
            <Link href={"/pages/shop"}>
              <MdOutlineShoppingBag size={30} />
            </Link>
          </Button>
          <ThemesModeToggle />
          <Sheet>
            <SheetTrigger
              asChild
              className={
                "lg:hidden border h-9 w-9 inline-flex items-center justify-center rounded-md text-sm font-medium text-black dark:text-white"
              }
            >
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="md:w-[400px] w-[350px] overflow-y-scroll no-scrollbar">
              <SheetTitle>Your perspective</SheetTitle>
              <SheetDescription>
                Discover untold stories and whispered tales on our channel
              </SheetDescription>
              <SidebarLayout />
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </nav>
  );
}
