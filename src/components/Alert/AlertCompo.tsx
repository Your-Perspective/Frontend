import React from "react";
import { AlertProps } from "@/types/Types";
import Container from "../container-section/Container";
import {Alert} from "antd";

export default function AlertCompo({ title, content, variant }: AlertProps) {
  return (
    <Alert
      banner
      className={'text-center font-medium w-full'}
      message={title}
      description={content}
      type={variant}
      closable
    />
  );
}
