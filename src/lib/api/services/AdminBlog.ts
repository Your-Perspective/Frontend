import { apiSlice } from "@/lib/apiSlice";
import {
  CategoriesProp,
  ThumbnailProp,
  ListBlog,
  CreateBlog,
  updateBlog,
  DeleteBlog,
  TagProps,
} from "@/types/Types";

export const dashboardBlogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListCategory: builder.query<CategoriesProp[], void>({
      query: () => `/categories`,
      keepUnusedDataFor: 5,
      providesTags: ["adminBlog"],
    }),

    getListThumbnail: builder.query<ThumbnailProp[], void>({
      query: () => `/admin/banners`,
      keepUnusedDataFor: 5,
      providesTags: ["adminBlog"],
    }),

    getListTag: builder.query<TagProps[], void>({
      query: () => `/tags`,
      keepUnusedDataFor: 5,
      providesTags: ["adminBlog"],
    }),

    getListBlog: builder.query<ListBlog[], void>({
      query: () => `/admin/blogs`,
      keepUnusedDataFor: 5,
      providesTags: ["adminBlog"],
    }),

    CreateBlog: builder.mutation<void, Partial<CreateBlog>>({
      query: (formData) => ({
        url: `/admin/blog`,
        method: "POST",
        body: formData,
      }),
    }),

    UpdateBlog: builder.mutation<void, Partial<updateBlog>>({
      query: (formData) => {
        const { id, ...restFormData } = formData;
        return {
          url: `/admin/blog/${id}`,
          method: "PUT",
          body: {
            ...restFormData,
          },
        };
      },
    }),

    DeleteBlog: builder.mutation<DeleteBlog, number>({
      query: (id) => {
        return {
          url: `/admin/blog/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetListCategoryQuery,
  useGetListThumbnailQuery,
  useGetListTagQuery,
  useGetListBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = dashboardBlogApi;
