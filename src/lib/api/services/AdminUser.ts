import { apiSlice } from "@/lib/apiSlice";
import { ListUser, CreateUser, UpdateUser, DeleteUser } from "@/types/Types";

export const dashboardAdminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<ListUser[], void>({
      query: () => `/admin/users`,
      keepUnusedDataFor: 5,
      providesTags: ["adminUser"],
    }),

    CreateUser: builder.mutation<CreateUser, Partial<CreateUser>>({
      query: (formData) => ({
        url: `/admin/user`,
        method: "POST",
        body: formData,
      }),
    }),

    UpdateUser: builder.mutation<UpdateUser, Partial<UpdateUser>>({
      query: (formData) => {
        const { id, ...restFormData } = formData;
        console.log("update", restFormData);
        return {
          url: `/admin/user/${id}`,
          method: "PUT",
          body: {
            ...restFormData,
          },
        };
      },
    }),

    DeleteUser: builder.mutation<DeleteUser, number>({
      query: (id) => {
        return {
          url: `/admin/user/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = dashboardAdminApi;
