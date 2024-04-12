import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://real-blog-app-1.onrender.com/api/auth",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: "register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
    googleAuth: builder.mutation({
      query: (userInfo) => ({
        url: "google",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: userInfo,
      }),
      invalidatesTags: ["Users"],
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGoogleAuthMutation,
  useLogOutUserMutation,
} = authApi;
