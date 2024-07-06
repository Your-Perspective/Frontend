import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RootState {
  auth: {
    access: string | null;
  };
}

// Adjust the prepareHeaders function to accept a token parameter
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.backend_url,
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth.access;
  //   if (token) {
  //     headers.set("authorization", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQuery,
  tagTypes: ["user", "sample"],
  endpoints: (builder) => ({}),
});
