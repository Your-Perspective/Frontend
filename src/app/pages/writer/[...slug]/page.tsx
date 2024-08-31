"use client";

import { useGetBlogDetailByAuthorSlugQuery } from "@/lib/api/services/AllBlogs";
import React, { useEffect, useState } from "react";
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

  const [editorJsData, setEditorJsData] = useState<
    editorjson["formData"] | null
  >(null);

  useEffect(() => {
    const fetchDataForm = async () => {
      if (data) {
        const editorData = await convertHtmlToEditorJs(data.blogContent);
        setEditorJsData(editorData);
      }
    };

    if (isSuccess && data) {
      fetchDataForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess && editorJsData !== null) {
    const formData: editorjson = {
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

    return <Writer isUpdateComponent={true} FormData={formData} />;
  }

  return null;

  async function convertHtmlToEditorJs(
    html: string
  ): Promise<editorjson["formData"]> {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const blocks: Array<{ type: string; data: any }> = [];

    for (const node of Array.from(doc.body.childNodes)) {
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
          case "img":
            const imgNode = node as HTMLImageElement;

            blocks.push({
              type: "image",
              data: {
                url: imgNode.src,
                caption: imgNode.alt || "",
                withBorder: false,
                withBackground: false,
                stretched: false,
              },
            });
            break;
          case "iframe":
            const iframeNode = node as HTMLIFrameElement;
            blocks.push({
              type: "embed",
              data: {
                service: "youtube",
                source: iframeNode.src,
                embed: iframeNode.src,
                width: iframeNode.width || "100%",
                height: iframeNode.height || "auto",
                caption: iframeNode.title || "",
              },
            });
            break;
          default:
            break;
        }
      }
    }

    return {
      time: new Date().getTime(),
      blocks: blocks,
      version: "2.26.5",
    };
  }
}
