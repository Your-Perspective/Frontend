import { apiSlice } from "@/lib/apiSlice";
import { BlogDetailsProps, ContentsTypeProps } from "@/types/Types";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<ContentsTypeProps[], void>({
      query: () => `/blogs/`,
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    getBlogsBySlugCategory: builder.query<ContentsTypeProps[], string>({
      query: (slugGategory) => ({ url: `/blogs/${slugGategory}` }),
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    getBlogDetailByAuthorSlug: builder.query<BlogDetailsProps, string[]>({
      query: ([username, slug]) => ({
        url: `/blogs/@${username}/${slug}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    getRelatedBlogPostsBySlug: builder.query<ContentsTypeProps[], string[]>({
      query: ([username, slug]) => `/blogs/@${username}/${slug}/more`,
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogsBySlugCategoryQuery,
  useGetBlogDetailByAuthorSlugQuery,
  useGetRelatedBlogPostsBySlugQuery
} = blogsApi;
