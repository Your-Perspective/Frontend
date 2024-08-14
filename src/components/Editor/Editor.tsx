"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import CodeTool from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";

interface EditorProps {
  getData?: any;
  readonly?: boolean;
  data?: any;
}

export default function Editor({
  getData,
  readonly = false,
  data = [],
}: EditorProps) {
  const editorRef = useRef<any>(null);

  const saveContent = async () => {
    if (editorRef.current) {
      try {
        const content = await editorRef.current.save();
        if (typeof getData === "function") {
          getData(content);
        }
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }
  };

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        data: data && { blocks: data.blocks || [] },
        readOnly: readonly,
        placeholder: "press '/' to write your content ...",
        autofocus: true,
        holder: "editorjs",
        onChange: saveContent,
        tools: {
          header: {
            class: Header as unknown as ToolConstructable,
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4],
              inlineToolbar: true,
              defaultLevel: 3,
              shortcut: "SHIFT+H",
            },
          },
          list: List,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "SHIFT+Q",
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          code: CodeTool,
          inlineCode: {
            class: InlineCode,
            shortcut: "CTR+SHIFT+H",
          },
          checklist: Checklist,
          raw: RawTool,
          image: SimpleImage,
        },
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="editorjs"></div>;
}
