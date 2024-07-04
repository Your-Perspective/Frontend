import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "../ui/button";
import { IoIosArrowDown } from "react-icons/io";
import { DropdownSelectProps } from "@/types/Types";

export default function DropdownCompo({
  display_name,
  label,
  items,
}: DropdownSelectProps) {
  const [position, setPosition] = React.useState("all");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-3 justify-between capitalize"
        >
          {display_name}: {position || ""} <IoIosArrowDown />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {items.map((item) => (
            <DropdownMenuRadioItem key={item.label} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
