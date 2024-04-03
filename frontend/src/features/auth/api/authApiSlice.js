import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "api/auth/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "api/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
