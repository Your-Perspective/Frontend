import { apiSlice } from "@/lib/apiSlice";
import {
  RegisterAuthForm,
  LoginAuthForm,
  ForgetPasswordAuthForm,
  ConfirmPasswordAuthForm,
} from "@/types/Types";

export const authForm = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthRegister: builder.mutation<void, RegisterAuthForm>({
      query: (formData) => ({
        url: `/auth/register`,
        method: "POST",
        body: formData,
      }),
    }),

    getAuthLogin: builder.mutation<void, LoginAuthForm>({
      query: (formData) => ({
        url: `/auth/login`,
        method: "POST",
        body: formData,
      }),
    }),
    getAuthForgetPassword: builder.mutation<void, ForgetPasswordAuthForm>({
      query: (formData) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: formData,
      }),
    }),
    getAuthConfirmPassword: builder.mutation<void, ConfirmPasswordAuthForm>({
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
  useGetAuthRegisterMutation,
  useGetAuthLoginMutation,
  useGetAuthForgetPasswordMutation,
  useGetAuthConfirmPasswordMutation,
} = authForm;
