import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface RootState {
  auth: {
    access: string | null;
  };
}

// Adjust the prepareHeaders function to accept a token parameter
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
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
  tagTypes: ["blogs", "tabs", "authors"],
  endpoints: (builder) => ({}),
});

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      toast.error("Error not found!", {
        description:
          "data" in action.error
            ? (action.error.data as { message: string }).message
            : action.error.message,
        action: {
          label: "Undertand",
          onClick: () => close(),
        },
      });
    }

    return next(action);
  };
