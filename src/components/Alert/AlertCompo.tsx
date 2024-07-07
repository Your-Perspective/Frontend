"use client";

import React, { useEffect, useState } from "react";
import { AlertProps } from "@/types/Types";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { IoClose } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";

export default function AlertCompo({ title, content, variant }: AlertProps) {
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
      className={`rounded-none dark:bg-black bg-gray-100 justify-between transition-all items-center py-0 border-none ${
        open ? "flex" : "hidden"
      }`}
    >
      <div>
        <IoIosNotifications size={25} />
      </div>
      <p className="font-medium">{title}</p>
      <Button variant={"ghost"} onClick={handleClose}>
        <IoClose size={25} />
      </Button>
    </Alert>
  );
}
