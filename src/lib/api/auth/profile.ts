import { apiSlice } from "@/lib/apiSlice";
import { profileProps } from "@/types/Types";

export const ProfileAuth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<profileProps, void>({
      query: () => `/auth/profile`,
      keepUnusedDataFor: 5,
      providesTags: ["user", "blogs", "authors"],
    }),
  }),
});

export const { useGetCurrentUserQuery } = ProfileAuth;
