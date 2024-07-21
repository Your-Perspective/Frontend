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

export const AuthorStarShow = ({ stars }: { stars: number }) => {
  return Array.from({ length: stars }).map((_, index) => (
    <FaStar key={index} className="text-yellow-500" />
  ));
};

export default function AuthorAboutDialog({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
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
                width={40}
                height={40}
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
            <p>View hits: {AuthorDetail?.totalViews}</p>
            <p className="mt-2">{AuthorDetail?.bio}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
