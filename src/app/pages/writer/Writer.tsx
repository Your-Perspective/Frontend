"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Error from "@/app/error";
import Container from "@/components/container-section/Container";
import { Button } from "@/components/ui/button";
import { GetAuthByRoles } from "@/constrain/AuthByRole";
import { useAppSelector } from "@/lib/hooks";
import { MdPublish } from "react-icons/md";
import PopOverDialog from "@/components/Dialog/Dialog";
import { BlogPost, TabItem, Tags } from "@/types/Types";
import { FancyMultiSelect } from "@/components/selection/category-multi-select";
import { TagsMultipleSelect } from "@/components/selection/tags-multi-select";
import { usePostBlogMutation } from "@/lib/api/services/AllBlogs";
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
import { Textarea } from "@/components/ui/textarea";

const EditorComponent = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});

export default function Writer() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const token = useAppSelector((state) => state.auth);
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

  const handleChangeCategory = (values: TabItem[]) => {
    setFormData((pre) => ({
      ...pre,
      categoryIds: values,
    }));
  };
  const handleChangeTags = (values: Tags[]) => {
    setFormData((pre) => ({
      ...pre,
      tags: values,
    }));
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const postBlog = await postBLog({
        blogTitle: data.blogTitle,
        slug: data.BlogTitle,
        categoryIds: formData.categoryIds.map((item: TabItem) => item.id),
        blogContent: JSON.stringify(contentData),
        summary: data.description,
        thumbnail: contentData.blocks[0].data.url,
        tags: formData.tags.map((item: Tags) => item.id),
        isPin: false,
        minRead: data.minRead,
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
        <div className="flex justify-end items-center">
          <PopOverDialog
            key={"popover"}
            trigger={
              <Button
                variant={"default"}
                className="rounded-full bg-gradient-to-tr hover:bg-gradient-to-r transition-all  from-blue-800 to-primaryColor"
              >
                <MdPublish className="mr-2" /> Publish
              </Button>
            }
            title="Ready to publish your content?"
            description="Fill the required information fields"
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
                        <FormControl>
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
                        <FormControl>
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
                              items={formData.categoryIds}
                              getSelectedItems={handleChangeCategory}
                            />
                            <TagsMultipleSelect
                              items={formData.tags}
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
                  <div id="container-editor my-3">
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
            }
          />
        </div>
        <article>
          <EditorComponent getData={setContentData} />
        </article>
      </section>
    </Container>
  );
}
