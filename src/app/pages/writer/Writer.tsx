"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Error from "@/app/error";
import Container from "@/components/container-section/Container";
import { Button } from "@/components/ui/button";
import { GetAuthByRoles } from "@/constrain/AuthByRole";
import { useAppSelector } from "@/lib/hooks";
import { MdPublish } from "react-icons/md";
import PopOverDialog from "@/components/Dialog/Dialog";
import {
  BlogPost,
  BlogPostBody,
  editorjson,
  TabItem,
  Tags,
} from "@/types/Types";
import { FancyMultiSelect } from "@/components/selection/category-multi-select";
import { TagsMultipleSelect } from "@/components/selection/tags-multi-select";
import {
  usePostBlogMutation,
  useUpdateBlogMutation,
} from "@/lib/api/services/AllBlogs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/app/loading";

import editorJsHtml from "editorjs-html";
import { OutputData } from "@editorjs/editorjs";

const EditorComponent = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});

export default function Writer({
  FormData = {
    blogTitle: "",
    published: true,
    blogContent: "",
    slug: "",
    isPin: false,
    thumbnail: "",
    summary: "",
    minRead: 5,
    categories: [],
    detailtags: [],
  },
  isUpdateComponent = false,
}: {
  FormData?: editorjson;
  isUpdateComponent?: Boolean;
}) {
  const [loading, isLoading] = useState(true);
  const [isAuthorized, setAuthorized] = useState(false);
  const token = useAppSelector((state) => state.auth);
  const [contentData, setContentData] = useState<any>(FormData.formData);

  const [postBLog, { isLoading: blogIsPosting, isSuccess: BlogPostSuccess }] =
    usePostBlogMutation();
  const [
    UpdateBlog,
    { isLoading: blogIsUpdating, isSuccess: BlogUpdateSuccess },
  ] = useUpdateBlogMutation();
  const form = useForm();

  const [formData, setFormData] = useState<editorjson>(FormData);

  useEffect(() => {
    async function checkAuthorization() {
      const { isAuthorized, loading } = await GetAuthByRoles({
        token: token.accessToken,
        role: ["AUTHOR", "ADMIN"],
      });
      isLoading(loading);
      setAuthorized(isAuthorized);
    }

    if (token) {
      checkAuthorization();
    }
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  const handleChangeCategory = (values: TabItem[]) => {
    setFormData((pre) => ({
      ...pre,
      categories: values,
    }));
  };
  const handleChangeTags = (values: Tags[]) => {
    setFormData((pre) => ({
      ...pre,
      tags: values,
    }));
  };

  const edjsParser = editorJsHtml();

  let htmlContent: string[] = [];

  if (contentData) {
    htmlContent = edjsParser.parse(contentData as OutputData);
  }

  const combinedHtmlContent = htmlContent.join("");

  const onSubmit = async (data: FieldValues) => {
    const blogData: BlogPostBody = {
      blogTitle: data.blogTitle ?? formData.blogTitle,
      slug: data.BlogTitle ?? formData.blogTitle,
      categoryIds:
        formData?.categories && formData.categories.length > 0
          ? formData.categories.map((item: TabItem) => item.id)
          : [],
      blogContent: combinedHtmlContent,
      summary: data.description ?? formData.summary,
      thumbnail: contentData?.blocks[0].data.url,
      tags:
        formData?.tags && formData.tags.length > 0
          ? formData.tags.map((item: Tags) => item.id)
          : [],
      isPin: formData.isPin ?? false,
      minRead: data.minRead ?? formData.minRead,
      published: formData.published ?? false,
    };
    try {
      if (isUpdateComponent) {
        const updateBlog = await UpdateBlog({
          blogId: data.blogTitle,
          ...blogData,
        });
      } else {
        const postBlog = await postBLog(blogData).unwrap();
      }

      if (BlogUpdateSuccess || BlogPostSuccess) {
        toast.success("Blog posted successfully!");
        if (typeof window !== "undefined") {
          // window.location.reload();
        }
      }
    } catch (err) {
      toast.warning("Double check, try again later!");
    }
  };

  if (isAuthorized) {
    return (
      <Container classNames="py-10">
        <section id="container-editor" className="flex flex-col gap-3">
          <div className="flex justify-end items-center">
            <PopOverDialog
              key={"popover"}
              trigger={
                <Button
                  variant={"default"}
                  className="rounded-full dark:text-white bg-gradient-to-tr hover:bg-gradient-to-r transition-all  from-blue-800 to-primaryColor"
                >
                  <MdPublish className="mr-2" />{" "}
                  {isUpdateComponent ? "Update" : "Publish"}
                </Button>
              }
              title="Final Steps to Publish"
              description="Complete the fields below to publish your content."
              content={
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6 mt-5"
                  >
                    <FormField
                      control={form.control}
                      name="blogTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl defaultValue={formData.blogTitle}>
                            <Input {...field} placeholder="Title" required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl defaultValue={formData.summary}>
                            <Input
                              {...field}
                              placeholder="Description"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categories</FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-2">
                              <FancyMultiSelect
                                items={formData?.categories || []}
                                getSelectedItems={handleChangeCategory}
                              />
                              <TagsMultipleSelect
                                items={formData?.detailtags || []}
                                getSelectedItems={handleChangeTags}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="minRead"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Min read</FormLabel>
                          <FormControl defaultValue={formData.minRead}>
                            <Input
                              type="number"
                              min={0}
                              {...field}
                              placeholder="Reader could spend time to read in minutes"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div id="container-editor my-3">
                      <Button
                        disabled={blogIsPosting || blogIsUpdating}
                        type="submit"
                        variant={"default"}
                        className="w-full"
                      >
                        {isUpdateComponent ? "Update" : "Publish"}
                      </Button>
                    </div>
                  </form>
                </Form>
              }
            />
          </div>
          <article>
            <EditorComponent
              data={FormData.formData}
              getData={setContentData}
            />
          </article>
        </section>
      </Container>
    );
  } else {
    return (
      <Error
        gotoLogin
        errorCode={403}
        text_display="this page need authorized user"
      />
    );
  }
}
