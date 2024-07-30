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
export default function Navbar() {
  const pathName = usePathname();
  const [hide, setHide] = useState(false);

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
      className={hide ? "hidden" : "py-4 px-0 sticky z-40 -top-1 bg-background"}
    >
      <Container classNames="flex justify-between items-center md:gap-10 gap-3">
        <Link href={"/"} className="min-w-[55px]">
          <Image
            priority
            width={40}
            src={logo}
            alt="your-perspective - logo"
            className="rounded-full w-[45px] h-[45px] object-cover"
          />
        </Link>
        <ClickToCommand />
        <div className="flex md:gap-3 gap-2 items-center">
          <Button variant={"link"} className="relative hidden p-0" asChild>
            <Link href={"/pages/shop"}>
              <MdOutlineShoppingBag size={30} />
            </Link>
          </Button>
          <ThemesModeToggle />
        </div>
      </Container>
    </nav>
  );
}
