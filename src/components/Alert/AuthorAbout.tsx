"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HandleImage } from "@/constrain/HandleImage";
import { useGetAuthorAboutQuery } from "@/lib/api/services/Author";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import TooltipComponent from "../tooltip/Tooltip";

export const AuthorStarShow = ({ stars }: { stars: number }) => {
  const maxStarsToShow = Math.min(stars, 5);
  return Array.from({ length: maxStarsToShow }).map((_, index) => (
    <TooltipComponent
      key={index + "star"}
      content={"Star top author" + ` ${stars}`}
    >
      <FaStar key={index} className="text-yellow-500" />
    </TooltipComponent>
  ));
};

export default function AuthorAboutDialog({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {
    data: AuthorDetail,
    isLoading,
    isSuccess,
    error,
  } = useGetAuthorAboutQuery(username);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {AuthorDetail && (
              <Image
                width={50}
                height={50}
                priority
                src={HandleImage({ src: AuthorDetail.profileImage })}
                alt={AuthorDetail.userName}
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
            )}
            <div className="flex flex-col gap-2">
              <p className="capitalize">{AuthorDetail?.userName}</p>
              <div className="flex items-center gap-1">
                {AuthorDetail && (
                  <AuthorStarShow stars={AuthorDetail.top3Count} />
                )}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            <p>View hits: {AuthorDetail?.formatTotalCountViewer}</p>
            <p className="mt-2">{AuthorDetail?.bio}</p>
            <Button
              className="w-full mt-5"
              onClick={() =>
                router.push(`/pages/author-detail/${AuthorDetail?.userName}`)
              }
            >
              View Detail
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
