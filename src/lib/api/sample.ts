import { Pokemon } from "@/types/Types";
import { apiSlice } from "../apiSlice";

export const sampleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSampleName: builder.query<Pokemon, string>({
      query: (name: string) => `pokemon/${name}`,
      keepUnusedDataFor: 5,
      providesTags: ["sample"],
    }),
  }),
});

// Correctly exporting the hook based on the endpoint name
export const { useGetSampleNameQuery } = sampleApiSlice;