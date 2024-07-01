"use client";

import Container from "@/components/container-section/Container";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGetSampleNameQuery } from "@/lib/api/sample";
import Link from "next/link";

export default function Demo() {
  const { data, error, isLoading } = useGetSampleNameQuery("bulbasaur"); // need follow naming convention of RTK
  return (
    <Container classNames="flex flex-col gap-5">
      <Button className="shadow-md w-fit shadow-primary" asChild>
        <Link href={"/"}>Home</Link>
      </Button>
      <div className="App">
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <div className="flex justify-center w-1/2 mx-auto items-center min-h-screen">
            <Progress value={90} />
          </div>
        ) : data ? (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-3xl font-semibold text-center">
              Query: {data.name}
            </p>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
