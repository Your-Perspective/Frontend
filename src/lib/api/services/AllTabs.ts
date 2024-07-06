import { apiSlice } from "@/lib/apiSlice";
import { ContentsTypeProps, TabItem } from "@/types/Types";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<TabItem[], string>({
      query: () => ({ url: `/categories` }),
      keepUnusedDataFor: 5,
      providesTags: ["blogs"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApi;
