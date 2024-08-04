import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { isRejectedWithValue } from "@reduxjs/toolkit";

import type {
  MiddlewareAPI,
  Middleware,
  SerializedError,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { toast } from "sonner";
import { AuthState, logOut, setCredentials } from "./api/auth/authSlice";
import { getDecryptedRefresh } from "./cryptography";

interface RootState {
  auth: {
    accessToken: string | null;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

interface CustomSerializedError extends SerializedError {
  status?: number;
  data?: {
    message?: string;
    title?: string;
    detail?: string;
  };
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refresh = await getDecryptedRefresh();
    if (refresh) {
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refresh },
          },
          api,
          extraOptions
        );

        let newToken = refreshResult?.data as string;

        if (newToken) {
          api.dispatch(
            setCredentials({
              accessToken: newToken,
              refreshToken: "",
            })
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } catch (error) {
        api.dispatch(logOut());
      }
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

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

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["blogs", "tabs", "authors", "banners"],
  endpoints: (builder) => ({}),
});
