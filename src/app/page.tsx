import Container from "@/components/container-section/Container";
import { Counter } from "@/components/redux/Counter";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
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
      </Container>
    </main>
  );
}
