"use client";

import Error from "@/app/error";
import Loading from "@/app/loading";
import Container from "@/components/container-section/Container";
import { Button } from "@/components/ui/button";
import { HandleImage } from "@/constrain/HandleImage";
import { useGetCurrentUserQuery } from "@/lib/api/auth/profile";
import { PenIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBlogByAuthorQuery } from "@/lib/api/services/Author";
import { BsFillGridFill } from "react-icons/bs";
import { HiViewColumns } from "react-icons/hi2";
import NotFoundPage from "@/app/not-found";
import ContentCard from "@/components/Card/Card";
import { isBlog } from "@/components/Tabs/Tabs";
import { useState } from "react";

export default function Page() {
  const {
    data,
    isLoading,
    isSuccess,
    error: ProfileError,
  } = useGetCurrentUserQuery();

  const {
    data: Blogs,
    isLoading: isBlogLoading,
    isSuccess: isBlogSuccess,
    error: isBlogLoadingError,
  } = useGetBlogByAuthorQuery(data?.userName || "");

  const [style, setStyle] = useState<"column" | "grid" | undefined>("column");

  const handleChange = () => {
    if (style === "column") {
      setStyle("grid");
    } else {
      setStyle("column");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (ProfileError) {
    return (
      <Error
        back_to_home
        gotoLogin
        text_display="Maybe it is not your profile!"
      />
    );
  }

  if (isSuccess) {
    return (
      <main>
        <Container classNames="my-5">
          <section
            aria-label="profile-header"
            className="grid grid-cols-5 gap-5"
          >
            <div className="flex items-center gap-5 lg:col-span-4 md:col-span-3 col-span-5">
              <Image
                priority
                width={200}
                height={200}
                src={HandleImage({ src: data?.profileImage })}
                alt={data.userName}
                className="object-cover repeat-0 w-[100px] h-[100px] rounded-full"
              />
              <div className="flex flex-col gap-2">
                <h1 className="font-medium capitalize">{data.userName}</h1>
                <p className="font-medium capitalize">
                  Total views: {data.formatTotalCountViewer}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-5 w-full lg:col-span-1 md:col-span-2 col-span-5">
              <Button className="flex gap-3 md:w-fit w-full">
                Edit <PenIcon size={15} />
              </Button>
              <Button
                className="md:w-fit w-full flex gap-3 bg-background_gradient hover:bg-gradient-to-r from-blue-800 to-primaryColor text-white dark:text-white"
                asChild
              >
                <Link href={"/pages/writer"}>
                  New blog <PlusCircle size={15} />
                </Link>
              </Button>
            </div>
          </section>
          <Tabs
            defaultValue="blogs"
            className="pb-5 sticky top-10 z-10 h-screen my-10"
          >
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent dark:bg-0 p-0">
              <TabsTrigger
                className="relative capitalize rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                key={"blogs"}
                value="blogs"
              >
                Blogs
              </TabsTrigger>
              <TabsTrigger
                className="relative capitalize rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                key={"about"}
                value="about"
              >
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent value="blogs">
              <section className="md:col-span-2 col-span-3">
                <div className="flex justify-between items-center py-3">
                  <p>All Blogs</p>
                  <Button
                    className="text-lg text-primary"
                    variant={"link"}
                    onClick={handleChange}
                  >
                    {style !== "column" ? (
                      <BsFillGridFill />
                    ) : (
                      <HiViewColumns />
                    )}
                  </Button>
                </div>
                {Blogs && Blogs.length <= 0 && (
                  <NotFoundPage text_display="Blogs not found" />
                )}
                {isBlogSuccess && (
                  <section className="w-full rounded-md h-screen relative mt-3">
                    <div
                      className={`${
                        style === "column"
                          ? "grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
                          : ""
                      }`}
                    >
                      {Blogs?.map((item, index) => (
                        <ContentCard
                          editable={true}
                          option={{
                            option: style,
                          }}
                          props={{ ...item }}
                          key={isBlog(item) ? item.slug : index.toString()}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </section>
            </TabsContent>
            <TabsContent value="about" className="my-5">
              {data.about}
            </TabsContent>
          </Tabs>
        </Container>
      </main>
    );
  }
}
