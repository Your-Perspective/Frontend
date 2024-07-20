"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

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
    <div>
      <ul className="grid gap-3">
        <Link
          className={`p-3 rounded-xl dark:text-white cursor-pointer ${
            activeLink === "User"
              ? "bg-blue-500 text-white"
              : "hover:bg-slate-200 text-[#374151] dark:hover:text-black"
          }`}
          onClick={() => handleLinkClick("User")}
          href={"/pages/admin/user"}
        >
          User
        </Link>
        <Link
          className={`p-3 rounded-xl dark:text-white cursor-pointer ${
            activeLink === "Blog"
              ? "bg-blue-500 text-white"
              : "hover:bg-slate-200 text-[#374151] dark:hover:text-black"
          }`}
          onClick={() => handleLinkClick("Blog")}
          href={"/pages/admin/blog"}
        >
          Blog
        </Link>
        <Link
          className={`p-3 rounded-xl dark:text-white cursor-pointer ${
            activeLink === "Banner"
              ? "bg-blue-500 text-white"
              : "hover:bg-slate-200 text-[#374151] dark:hover:text-black"
          }`}
          onClick={() => handleLinkClick("Banner")}
          href={"/pages/admin/banner"}
        >
          Banner
        </Link>
      </ul>
    </div>
  );
}
