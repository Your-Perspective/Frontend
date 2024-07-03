'use client';

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
        <Badge className="w-fit py-2 px-3 border-0 rounded-full bg-white flex items-center gap-2 text-primary shadow-lg absolute top-1 right-2">
          {oldPrice && (
            <span className="line-through text-sm">${oldPrice}</span>
          )}
          {newPrice && (
            <span className="text-primaryColor text-sm font-semibold">
              ${newPrice}
            </span>
          )}
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-xl font-medium">{title}</p>
        <p className="text-base text-gray-500">{description}</p>
        {type && <p className="text-base font-medium">Type: {type}</p>}
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
