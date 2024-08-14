"use client";

import { useEffect } from "react";
import Container from "@/components/container-section/Container";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiLogIn, FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";
import { BsBack } from "react-icons/bs";
import { navigation } from "./action";

export default function Error({
  error,
  reset,
  gotoLogin = false,
  errorCode = 500,
  text_display = "Something went wrong!",
  retry_text = "Try again",
  back_to_home = false,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
  errorCode?: number;
  text_display?: string;
  retry_text?: string;
  back_to_home?: true | false;
  gotoLogin?: true | false;
}) {
  return (
    <Container>
      <section className="flex flex-col justify-center items-center min-h-full gap-10 my-20 px-2">
        <p className="text-9xl font-bold dark:text-primaryColor text-red-700 animate-pulse">
          {errorCode}
        </p>
        <p className="md:text-5xl text-4xl font-bold uppercase text-center">
          <span className="text-destructive">{text_display}</span>
        </p>
        <div className="flex gap-5">
          {back_to_home && (
            <Button
              onClick={() => navigation("/")}
              variant={"link"}
              className="font-bold capitalize flex gap-4 items-center text-primary"
            >
              <BsBack /> homepage
            </Button>
          )}
          {gotoLogin && (
            <Button
              onClick={() => navigation("/pages/auth-form/login")}
              variant={"link"}
              className="font-bold capitalize flex gap-4 items-center text-primary"
            >
              <FiLogIn /> Login
            </Button>
          )}
          <Button
            onClick={() => reset && reset()}
            variant={"destructive"}
            className="font-bold capitalize flex gap-4 items-center"
          >
            <FiRefreshCw size={25} /> {retry_text}
          </Button>
        </div>
      </section>
    </Container >
  );
}
