import React from "react";
import { ThemesModeToggle } from "../darkmode-switcher/ThemesSwitcher";
import Container from "../container-section/Container";
import { ClickToCommand } from "../Combobox/Combobox";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Badge } from "../ui/badge";
import logo from "@/assets/logo.jpg";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="py-4 container px-0">
      <Container classNames="flex justify-between items-center">
        <Image
          width={60}
          src={logo}
          alt="your-perspective - logo"
          className="rounded-full"
        />
        <ClickToCommand />
        <div className="flex gap-5 items-center">
          <div className="relative">
            <Badge className="rounded-full absolute -top-2 left-2">0</Badge>
            <MdOutlineShoppingBag size={30} />
          </div>
          <ThemesModeToggle />
        </div>
      </Container>
    </nav>
  );
}
