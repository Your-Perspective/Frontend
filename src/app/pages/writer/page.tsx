"use client";

import { useEffect, useState } from "react";
import Error from "@/app/error";
import Container from "@/components/container-section/Container";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GetAuthByRoles } from "@/constrain/AuthByRole";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FieldValues, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const EditorComponent = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});

export default function Writer() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const token = useAppSelector((state) => state.auth);
  // content is json used to retrieve the data from editor.
  const [contentData, setContentData] = useState<any>();
  const form = useForm();

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

  const onSubmit = (data: FieldValues) => {
    console.log({
      title: data.title,
      description: data.description,
      contentData,
    });
  };

  return (
    <Container classNames="py-10">
      <Alert
        variant={"destructive"}
        className="text-center bg-destructive text-white  dark:text-white absolute top-32 w-1/2 left-1/2 transform -translate-x-1/2 z-40"
      >
        Page under construction
      </Alert>

      <section id="container-editor" className="flex flex-col gap-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
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
            <EditorComponent getData={setContentData} />
            <div id="container-editor">
              <Button type="submit" variant={"default"} className="w-full">
                Save Content
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  );
}
