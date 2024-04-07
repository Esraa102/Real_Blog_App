import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: (userInfo) => ({
        url: `api/user/update/${userInfo.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: userInfo,
      }),
    }),
    deleteUserAccount: builder.mutation({
      query: (id) => ({
        url: `api/user/delete/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const { useUpdateUserProfileMutation, useDeleteUserAccountMutation } =
  userApi;
