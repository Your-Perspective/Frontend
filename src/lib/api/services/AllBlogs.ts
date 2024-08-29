import { apiSlice } from "@/lib/apiSlice";
import {
  BlogDetailsProps,
  BlogPostBody,
  BlogsProps,
  ContentsTypeProps,
  RecentPostProps,
} from "@/types/Types";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<BlogsProps[], void>({
      query: () => `/blogs/`,
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    getBlogsBySlugCategory: builder.query<BlogsProps[], string>({
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
    getRelatedBlogPostsBySlug: builder.query<ContentsTypeProps[], string>({
      query: (username) => `/blogs/@${username}/more`,
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    getRecentPost: builder.query<RecentPostProps[], void>({
      query: () => `/blogs/recent-posts`,
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
    postBlog: builder.mutation<void, Partial<BlogPostBody>>({
      query: (formData) => ({
        url: `/blogs`,
        method: "POST",
        body: formData,
      }),
    }),
    UpdateBlog: builder.mutation<void, Partial<BlogPostBody>>({
      query: (formData) => {
        const { blogId, ...BlogPostBody } = formData;
        console.log(formData);
        return {
          url: `/blogs/${blogId}`,
          method: "PUT",
          body: {
            ...BlogPostBody,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogsBySlugCategoryQuery,
  useGetBlogDetailByAuthorSlugQuery,
  useGetRelatedBlogPostsBySlugQuery,
  useGetRecentPostQuery,
  usePostBlogMutation,
  useUpdateBlogMutation
} = blogsApi;
