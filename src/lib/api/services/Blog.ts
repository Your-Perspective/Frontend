import { apiSlice } from "@/lib/apiSlice";
import {
  CategoriesProp,
  ThumbnailProp,
  ListBlog,
  CreateBlog,
  updateBlog,
  DeleteBlog,
} from "@/types/Types";

export const dashboardBlogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListCategory: builder.query<[CategoriesProp], void>({
      query: () => `/categories`,
      keepUnusedDataFor: 5,
      providesTags: ["adminBlog"],
    }),

    getListThumbnail: builder.query<[ThumbnailProp], void>({
      query: () => `/admin/banners`,
      keepUnusedDataFor: 5,
      providesTags: ["adminBlog"],
    }),

    list: builder.mutation<ListBlog, Partial<ListBlog>>({
      query: (formData) => ({
        url: `/blogs/`,
        method: "POST",
        body: formData,
      }),
    }),

    CreateBlog: builder.mutation<CreateBlog, Partial<CreateBlog>>({
      query: (formData) => ({
        url: `/admin/blog`,
        method: "POST",
        body: formData,
      }),
    }),

    UpdateBlog: builder.mutation<updateBlog, Partial<updateBlog>>({
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
        console.log("id", id);
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
  useListMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = dashboardBlogApi;
