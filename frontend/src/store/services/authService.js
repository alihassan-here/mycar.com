import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3060/api/v1",
  }),
  endpoints: (builder) => {
    return {
      authLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "login",
            method: "POST",
            body: loginData,
          };
        },
      }),
      authSignUp: builder.mutation({
        query: (signUpData) => {
          return {
            url: "register",
            method: "POST",
            body: signUpData,
          };
        },
      }),
    };
  },
});

export const { useAuthLoginMutation, useAuthSignUpMutation } = authService;

export default authService;
