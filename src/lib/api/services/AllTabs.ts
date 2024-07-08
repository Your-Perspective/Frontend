import { apiSlice } from "@/lib/apiSlice";
import { TabItem } from "@/types/Types";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<TabItem[], void>({
      query: () => `/categories`,
      keepUnusedDataFor: 5,
      providesTags: ["tabs"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
