"use client";
import React, { useState, useEffect } from "react";
import { ThemesModeToggle } from "../darkmode-switcher/ThemesSwitcher";
import Container from "../container-section/Container";
import { ClickToCommand } from "../Combobox/Combobox";
import logo from "@/assets/logo.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuPenSquare } from "react-icons/lu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarLayout from "../sidbar/Sidebar";
import { Menu } from "lucide-react";
import { useGetCurrentUserQuery } from "@/lib/api/auth/profile";

export default function Navbar() {
  // used for refreshing then navigating to writer.
  const {
    data: CurrentUser,
    isLoading: UserLoading,
    error: UserError,
    refetch,
  } = useGetCurrentUserQuery();

  const pathName = usePathname();
  const [hide, setHide] = useState(true);

  const pathPrefixes = ["/pages/admin"];
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
          <Button variant={"outline"} className="relative px-2" asChild>
            <Link href={"/pages/writer"}>
              <LuPenSquare size={25} />
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
