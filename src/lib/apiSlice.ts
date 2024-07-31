import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type {
  MiddlewareAPI,
  Middleware,
  SerializedError,
} from "@reduxjs/toolkit";
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

interface CustomSerializedError extends SerializedError {
  status?: number;
  data?: {
    message?: string;
    title?: string;
    detail?: string;
  };
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const error = action.payload as CustomSerializedError;

      const status = error.status ?? "Unknown status";
      const message =
        error.data?.detail ||
        error.data?.message ||
        error.data?.title ||
        "Something went wrong";

      toast.error(`Async error!: ${status}`, {
        richColors: true,
        description: message,
        position: "bottom-right",
        action: {
          label: "Understand",
          onClick: () => console.log("UnderstandingError"),
        },
      });
    }

    return next(action);
  };
