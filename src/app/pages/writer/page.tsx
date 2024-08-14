"use client";

import Error from "@/app/error";
import Container from "@/components/container-section/Container";
import Editor from "@/components/Editor/Editor";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GetAuthByRoles } from "@/constrain/AuthByRole";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Writer() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const token = useAppSelector((state) => state.auth);
  // content is json used to retrieve the data from editor.
  const [contentData, setContentData] = useState<any>(null);

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

  return (
    <Container classNames="py-10">
      <Alert variant={"destructive"} className="text-center dark:text-white">
        Page under construction
      </Alert>
      <section id="container-editor" className="flex flex-col gap-3">
        <Textarea
          name="header"
          placeholder="Title"
          className="border-0 no-scrollbar px-0 py-2 focus:outline-none focus:border-0 focus-visible:ring-0 lg:text-4xl md:text-3xl text-2xl font-semibold shadow-none"
        />
        <Textarea
          placeholder="Description"
          name="description"
          className="no-scrollbar border-0 px-0 focus:outline-none focus:border-0 focus-visible:ring-0 text-gray-600 shadow-none"
        />
      </section>
      <Editor GetData={setContentData} />
      <div id="container-editor">
        <Button variant={"default"} className="w-full">
          Save Content
        </Button>
      </div>
    </Container>
  );
}
