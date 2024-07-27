import { apiSlice } from "@/lib/apiSlice";
import { TabItem } from "@/types/Types";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<TabItem[], void>({
      query: () => `/categories`,
      keepUnusedDataFor: 5,
      providesTags: ["tabs"],
    }),
    getPopularCategories: builder.query<TabItem[], void>({
      query: () => `/categories/blog-count`,
      keepUnusedDataFor: 5,
      providesTags: ["tabs"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetPopularCategoriesQuery } = categoriesApi;
