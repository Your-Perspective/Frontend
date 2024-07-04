"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ProductCardProps } from "@/types/Types";
import { useRouter } from "next/navigation";

export default function ProductCard({
  uuid,
  thumbnail,
  oldPrice,
  newPrice,
  title,
  description,
  type,
  colors,
}: ProductCardProps) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/pages/shop/product/${uuid}`)}
      key={uuid}
      className="p-0 flex flex-col gap-3 rounded-none border-0 shadow-none text-primary cursor-pointer"
    >
      <CardHeader className="relative p-0111">
        <Image
          src={thumbnail}
          alt="product-alt"
          className="w-full h-[320px] object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-xl font-medium">{title}</p>
        <div className="w-fit py-2 border-0 flex items-center gap-1 text-primary">
          {oldPrice && (
            <span className="line-through text-sm">${oldPrice}</span>
          )}
          {newPrice && (
            <span className="text-primary text-lg font-semibold">
              ${newPrice}
            </span>
          )}
        </div>
        <div className="flex gap-1 flex-wrap mt-3">
          {colors?.map((color, index) => (
            <div
              key={color}
              className={` rounded-full w-[25px] h-[25px]`}
              style={{ backgroundColor: colors[index] || undefined }}
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
