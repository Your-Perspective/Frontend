import { apiSlice } from "@/lib/apiSlice";
import {
  AuthorDetailsProps,
  BlogByAuthors,
  TopAuthorProps,
} from "@/types/Types";

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
    getBlogByAuthor: builder.query<BlogByAuthors[], string>({
      query: (username) => `/author/${username}/pinned`,
      keepUnusedDataFor: 5,
      providesTags: ["authors"],
    }),
    deleteBlog: builder.mutation<void, number>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['authors']
    }),
  }),
});

export const {
  useGetTopAuthorsQuery,
  useGetAuthorAboutQuery,
  useGetBlogByAuthorQuery,
  useDeleteBlogMutation
} = Authors;
