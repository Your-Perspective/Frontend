"use client";

import Error from "@/app/error";
import Loading from "@/app/loading";
import Container from "@/components/container-section/Container";
import { useGetCurrentUserQuery } from "@/lib/api/auth/profile";

export default function Page() {
  const {
    data,
    isLoading,
    isSuccess,
    error: ProfileError,
  } = useGetCurrentUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (ProfileError) {
    return (
      <Error
        back_to_home
        gotoLogin
        text_display="Maybe it is not your profile!"
      />
    );
  }

  if (isSuccess) {
    return <Container classNames="my-5">{data.userName}</Container>;
  }
}
