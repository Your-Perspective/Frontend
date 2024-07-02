"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(90), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Progress value={progress} className="w-[50%] mx-auto" />
    </div>
  );
}
