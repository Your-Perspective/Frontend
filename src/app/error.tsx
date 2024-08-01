"use client";

import { useEffect } from "react";
import Container from "@/components/container-section/Container";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <Container>
      <section className="flex flex-col justify-center items-center min-h-full gap-10 my-20">
        <p className="text-9xl font-bold dark:text-primaryColor text-red-700 animate-pulse">
          500
        </p>
        <p className="text-5xl font-bold uppercase text-center">
          Something <span className="text-destructive">error!</span>
        </p>
        <Button
          onClick={() => reset()}
          variant={"destructive"}
          className="font-bold capitalize flex gap-4 items-center"
        >
          <FiRefreshCw size={25} /> Refresh
        </Button>
      </section>
    </Container>
  );
}
