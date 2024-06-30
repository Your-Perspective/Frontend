"use client";

import Container from "@/components/container-section/Container";
import { Counter } from "@/components/redux/Counter";
import { Button } from "@/components/ui/button";
import { useGetPokemonByNameQuery } from "@/services/pokemon";
import Link from "next/link";

export default function Home() {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur"); // need follow naming convention of RTK
  return (
    <main>
      <Container classNames="text-center flex flex-col justify-center items-center min-h-screen">
        <Button className="shadow-md shadow-primary" asChild>
          <Link href={"/"}>Hello world!</Link>
        </Button>
        {/* example of redux */}
        <div className="my-10">
          <Counter />
        </div>
        <div className="App">
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>
              <h3>{data.name}</h3>
              {/* <img src={data.sprites.front_shiny} alt={data.species.name} /> */}
            </>
          ) : null}
        </div>
      </Container>
    </main>
  );
}
