import { apiSlice } from "@/lib/apiSlice";
import { TopAuthorProps } from "@/types/Types";

const Authors = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopAuthors: builder.query<TopAuthorProps[], void>({
      query: () => `/author/top-authors`,
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
  }),
});

export const { useGetTopAuthorsQuery } = Authors;
