"use client";

import React, { useEffect, useState } from "react";
import { AlertProps } from "@/types/Types";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import Link from "next/link";

export default function AlertCompo({
  title,
  content,
  variant,
  link_label,
  url,
}: AlertProps) {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => {
    setOpen(false);
    window !== undefined &&
      localStorage.setItem("alertLastShown", new Date().toISOString());
  };

  useEffect(() => {
    const lastShown =
      window !== undefined && localStorage.getItem("alertLastShown");
    if (lastShown) {
      const now = new Date();
      const differenceInTime = now.getTime() - new Date(lastShown).getTime();
      const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60));

      if (differenceInMinutes >= 20) {
        setOpen(true);
      }
    }
  }, []);

  return (
    <Alert
      className={`rounded-none py-2 mb-5 bg-gradient-to-r from-blue-950 to-primaryColor justify-between transition-all items-center border-none ${
        open ? "flex" : "hidden"
      }`}
    >
      <div className="text-white">
        <IoIosNotifications size={25} />
      </div>
      <div className="md:flex md:gap-2 gap-1 text-center justify-center items-center">
        <p className="font-semibold md:text-lg text-center text-base text-white">
          {title}
        </p>
        <Link
          className="underline font-medium text-center w- text-white"
          href={url}
        >
          {link_label}
        </Link>
      </div>
      <Button className="text-white" variant={"link"} onClick={handleClose}>
        <IoClose size={25} />
      </Button>
    </Alert>
  );
}
