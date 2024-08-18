"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FieldValues, useForm } from "react-hook-form";

import Error from "@/app/error";
import Container from "@/components/container-section/Container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GetAuthByRoles } from "@/constrain/AuthByRole";
import { useAppSelector } from "@/lib/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AlertType from "../../../components/UnderConstruction/AlertType";
import { BlogPost } from "@/types/Types";
import { FancyMultiSelect } from "@/components/selection/category-multi-select";
import { TagsMultipleSelect } from "@/components/selection/tags-multi-select";
import { usePostBlogMutation } from "@/lib/api/services/AllBlogs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const EditorComponent = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});

export default function Writer() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const token = useAppSelector((state) => state.auth);
  const [thumbnail, setThumnail] = useState<string>();

  // content is json used to retrieve the data from editor.
  const [contentData, setContentData] = useState<any>();
  const [postBLog, { isLoading: blogIsPosting }] = usePostBlogMutation();
  const form = useForm();

  const [formData, setFormData] = useState<BlogPost>({
    blogTitle: "",
    published: true,
    blogContent: "",
    slug: "",
    isPin: false,
    thumbnail: "",
    summary: "",
    minRead: 5,
    categoryIds: [],
    tags: [],
  });

  const handleChangeCategory = (values: number[]) => {
    setFormData((pre) => ({
      ...pre,
      categoryIds: values,
    }));
  };
  const handleChangeTags = (values: number[]) => {
    setFormData((pre) => ({
      ...pre,
      tags: values,
    }));
  };

  useEffect(() => {
    async function checkAuthorization() {
      const { isAuthorized } = await GetAuthByRoles({
        token: token.accessToken,
        role: ["AUTHOR", "ADMIN"],
      });
      setError(isAuthorized);
    }

    if (token.accessToken) {
      checkAuthorization();
    }
  }, [router, token, token.accessToken]);

  if (!error) {
    return (
      <Error
        gotoLogin
        errorCode={403}
        text_display="this page need authorized user"
      />
    );
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const postBlog = await postBLog({
        blogTitle: data.blogTitle,
        slug: data.BlogTitle,
        categoryIds: formData.categoryIds,
        blogContent: JSON.stringify(contentData),
        summary: data.description,
        thumbnail: data.thumbnail,
        tags: formData.tags,
        isPin: false,
        minRead: 5,
        published: true,
      }).unwrap();
      toast.success("Blog posted successfully!");
    } catch (err) {
      toast.warning("Double check, try again later!");
    }
  };

  return (
    <Container classNames="py-10">
      <section id="container-editor" className="flex flex-col gap-3">
        <AlertType />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="blogTitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Title"
                      className="lg:text-4xl md:text-3xl text-2xl font-semibold no-scrollbar border-0 px-0 h-fit focus:outline-none focus:border-0 focus-visible:ring-0 text-gray-600 shadow-none"
                    />
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
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description"
                      className="no-scrollbar border-0 px-0 h-fit focus:outline-none focus:border-0 focus-visible:ring-0 text-gray-600 shadow-none"
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
                  <FormControl>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                      <FancyMultiSelect
                        getSelectedItems={handleChangeCategory}
                      />
                      <TagsMultipleSelect getSelectedItems={handleChangeTags} />
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
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Reader could spend time to read in minutes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <EditorComponent getData={setContentData} />
            <div id="container-editor">
              <Button
                disabled={blogIsPosting}
                type="submit"
                variant={"default"}
                className="w-full"
              >
                Save Content
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  );
}
