"use client";

import Error from "@/app/error";
import Container from "@/components/container-section/Container";
import { Alert } from "@/components/ui/alert";
import { GetAuthByRoles } from "@/constrain/AuthByRole";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Writer() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const token = useAppSelector((state) => state.auth);

  useEffect(() => {
    async function checkAuthorization() {
      const { isAuthorized } = await GetAuthByRoles({
        token: token.accessToken,
        role: ["AUTHOR", "ADMIN"],
      });
      setError(isAuthorized);
    }

    if (token.accessToken) {
      checkAuthorization();
    }
  }, [router, token, token.accessToken]);

  if (!error) {
    return (
      <Error
        gotoLogin
        errorCode={403}
        text_display="this page need authorized user"
      />
    );
  }

  return (
    <Container>
      <Alert variant={"destructive"} className="text-center dark:text-white">
        Page is on developing
      </Alert>
    </Container>
  );
}
