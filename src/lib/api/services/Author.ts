import { apiSlice } from "@/lib/apiSlice";
import { AuthorDetailsProps, TopAuthorProps } from "@/types/Types";

const Authors = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopAuthors: builder.query<TopAuthorProps[], void>({
      query: () => `/author/top-authors`,
      keepUnusedDataFor: 5,
      providesTags: ["authors"],
    }),
    getAuthorAbout: builder.query<AuthorDetailsProps, string>({
      query: (username) => `/author/@${username}/detail`,
      keepUnusedDataFor: 5,
      providesTags: ["authors"],
    }),
  }),
});

export const { useGetTopAuthorsQuery, useGetAuthorAboutQuery } = Authors;
