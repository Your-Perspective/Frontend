import { apiSlice } from "@/lib/apiSlice";
import {
  RegisterAuthForm,
  LoginAuthForm,
  ForgetPasswordAuthForm,
  ConfirmPasswordAuthForm,
} from "@/types/Types";

export const authForm = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterAuthForm>({
      query: (formData) => ({
        url: `/auth/register`,
        method: "POST",
        body: formData,
      }),
    }),

    login: builder.mutation<void, LoginAuthForm>({
      query: (formData) => ({
        url: `/auth/login`,
        method: "POST",
        body: formData,
      }),
    }),
    forgetPassword: builder.mutation<void, ForgetPasswordAuthForm>({
      query: (formData) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: formData,
      }),
    }),
    ConfirmPassword: builder.mutation<
      ConfirmPasswordAuthForm,
      Partial<ConfirmPasswordAuthForm>
    >({
      query: (formData) => {
        const { token, ...restFormData } = formData;
        return {
          url: `/auth/reset-password?token=${token}`,
          method: "POST",
          body: {
            ...restFormData,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useConfirmPasswordMutation,
} = authForm;
