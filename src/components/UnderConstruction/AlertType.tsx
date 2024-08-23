import { Alert } from "@/components/ui/alert";
import React from "react";

export default function AlertType() {
  return (
    <Alert
      variant={"destructive"}
      className="text-center bg-destructive text-white  dark:text-white sticky z-40"
    >
      Page under construction
    </Alert>
  );
}
