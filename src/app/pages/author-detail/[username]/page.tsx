import AuthorDetail from "@/components/author-detail/AuthorDetail";
import Container from "@/components/container-section/Container";
import type { Metadata } from "next";

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = params.username;

  return {
    title: author + " | Your perspective",
  };
}

export default function authorDetailByUsername({
  params,
}: {
  params: { username: string };
}) {
  return (
    <Container>
      <AuthorDetail username={params.username} />
    </Container>
  );
}
