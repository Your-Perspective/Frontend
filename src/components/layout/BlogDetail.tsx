"use client";

import { useGetBannersQuery } from "@/lib/api/services/BannerApi";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { HandleImage } from "@/constrain/HandleImage";
import { BannerProps } from "@/types/Types";

export const splitBanners = (banners: BannerProps[] | undefined) => {
  const midIndex = Math.ceil((banners?.length ?? 0) / 2);
  return {
    firstPart: banners?.slice(0, midIndex),
    secondPart: banners?.slice(midIndex),
  };
};

const handleAdsRoute = (route: string) => {
  window !== undefined && window.open(route, "_blank");
};

export const showBanners = (
  from: number = 0,
  to: number = from + 3,
  Banners: BannerProps[] | undefined
) =>
  Banners?.slice(from, to)?.map((props) => (
    <Card
      onClick={() => handleAdsRoute(props.link)}
      key={props.id}
      aria-labelledby={props.title}
      className={`rounded-none border-x-0 border-t-0 border-b-2 shadow-none cursor-pointer hover:bg-slate-100`}
    >
      <CardContent className={`py-5 px-0 md:items-center items-start`}>
        <Image
          priority
          unoptimized={true}
          width={200}
          height={100}
          src={HandleImage({ src: props.imageUrl })}
          className="w-full h-auto"
          alt={props.title}
        />
      </CardContent>
    </Card>
  ));

export default function BlogDetailLayout({
  children,
  classNames,
}: Readonly<{ children: React.ReactNode; classNames?: string }>) {
  const { data: Banners, isSuccess, error, isLoading } = useGetBannersQuery();

  const { firstPart, secondPart } = splitBanners(Banners);

  return (
    <section
      aria-label="blog-detail-layout relative"
      className={`${classNames} grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10`}
    >
      <div className="col-span-1 lg:order-1 md:order-2 order-2 lg:sticky top-10 md:h-screen h-auto overflow-y-scroll no-scrollbar">
        {firstPart && showBanners(0, firstPart.length, Banners)}
      </div>
      <div className="md:col-span-2 col-span-1 md:order-1 order-1">
        {children}
      </div>
      <div className="col-span-1 order-3 lg:sticky top-10 md:h-screen h-auto overflow-y-scroll no-scrollbar">
        {secondPart &&
          showBanners(firstPart?.length ?? 0, Banners?.length, Banners)}
      </div>
    </section>
  );
}
