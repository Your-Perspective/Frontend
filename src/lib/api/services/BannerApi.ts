import { apiSlice } from "@/lib/apiSlice";
import { BannerProps } from "@/types/Types";

export const BannerShow = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<BannerProps[], void>({
      query: () => `/banners`,
      keepUnusedDataFor: 5,
      providesTags: ["banners"],
    }),
  }),
});

export const { useGetBannersQuery } = BannerShow;
