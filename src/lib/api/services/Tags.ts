import { apiSlice } from "@/lib/apiSlice";
import { Tags } from "@/types/Types";

export const TagsContoller = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<Tags[], void>({
      query: () => `/tags`,
      keepUnusedDataFor: 5,
      providesTags: ["tags"],
    }),
  }),
});

export const { useGetTagsQuery } = TagsContoller;
