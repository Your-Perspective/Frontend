import { apiSlice } from "@/lib/apiSlice";
import { ContentsTypeProps } from "@/types/Types";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<ContentsTypeProps, string>({
      query: () => ({ url: `/blog/blogs` }),
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    getBlogsBySlug: builder.query<ContentsTypeProps[], string>({
      query: (slug) => ({ url: `/blog/${slug}` }),
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetBlogsBySlugQuery } = blogsApi;
