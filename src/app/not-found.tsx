import Container from "@/components/container-section/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function notFoundPage() {
  return (
    <Container>
      <section className="flex flex-col justify-center items-center min-h-full gap-10 my-20">
        <p className="text-9xl font-bold dark:text-white text-red-700 animate-pulse">404</p>
        <p className="text-5xl text-center font-bold uppercase">Page not found!</p>
        <Button variant={"link"} className="font-bold capitalize text-center" asChild>
          <Link href={"/"} className="flex gap-5 text-primary">
            <FiArrowLeft size={20} /> Back to homepage
          </Link>
        </Button>
      </section>
    </Container>
  );
}
