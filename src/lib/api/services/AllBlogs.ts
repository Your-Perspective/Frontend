import { apiSlice } from "@/lib/apiSlice";
import { BlogDetailsProps, ContentsTypeProps } from "@/types/Types";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<ContentsTypeProps[], string>({
      query: () => ({ url: `/blog/blogs/` }),
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    getBlogsBySlugCategory: builder.query<ContentsTypeProps[], string>({
      query: (slugGategory) => ({ url: `/blog/${slugGategory}` }),
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    getBlogDetailByAuthorSlug: builder.query<BlogDetailsProps, string[]>({
      query: ([username, slug]) => ({
        url: `/blog/@${username}/${slug}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogsBySlugCategoryQuery,
  useGetBlogDetailByAuthorSlugQuery,
} = blogsApi;
