"use client";

import { useGetBlogDetailByAuthorSlugQuery } from "@/lib/api/services/AllBlogs";
import React from "react";
import Writer from "../Writer";
import { editorjson } from "@/types/Types";
import Loading from "@/app/loading";

export default function UpdateBlogs({
  params,
}: {
  params: { slug: [string, string] };
}) {
  const { data, isLoading, isSuccess } = useGetBlogDetailByAuthorSlugQuery([
    params.slug[0],
    params.slug[1],
  ]);

  if (isLoading) {
    return <Loading />;
  }

  function convertHtmlToEditorJs(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const blocks: Array<{ type: string; data: any }> = [];

    doc.body.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        switch (node.nodeName.toLowerCase()) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            blocks.push({
              type: "header",
              data: {
                text: (node as HTMLElement).textContent || "",
                level: parseInt(node.nodeName.substr(1), 10),
              },
            });
            break;
          case "p":
            blocks.push({
              type: "paragraph",
              data: {
                text: (node as HTMLElement).textContent || "",
              },
            });
            break;
          default:
            break;
        }
      }
    });

    return {
      time: new Date().getTime(),
      blocks: blocks,
      version: "2.26.5",
    };
  }

  const editorJsData = data ? convertHtmlToEditorJs(data.blogContent) : null;

  if (isSuccess && editorJsData !== null) {
    const FormData: editorjson = {
      blogTitle: data?.blogTitle,
      published: data?.published,
      slug: data?.slug,
      isPin: false,
      thumbnail: data?.thumbnail ?? "",
      summary: data?.summary,
      minRead: data?.minRead,
      categories: data?.categories,
      detailtags: data?.tags,
      formData: editorJsData,
    };

    return <Writer isUpdateComponent={true} FormData={FormData} />;
  }

  return null;
}
