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
        url: `/author/register`,
        method: "POST",
        body: formData,
      }),
    }),

    getAuthLogin: builder.mutation<void, LoginAuthForm>({
      query: (formData) => ({
        url: `/author/login`,
        method: "POST",
        body: formData,
      }),
    }),
    getAuthForgetPassword: builder.mutation<void, ForgetPasswordAuthForm>({
      query: (formData) => ({
        url: `/author/forgot-password`,
        method: "POST",
        body: formData,
      }),
    }),
    getAuthConfirmPassword: builder.mutation<void, ConfirmPasswordAuthForm>({
      query: (formData) => ({
        url: `/author/reset-password`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAuthRegisterMutation,
  useGetAuthLoginMutation,
  useGetAuthForgetPasswordMutation,
  useGetAuthConfirmPasswordMutation,
} = authForm;
