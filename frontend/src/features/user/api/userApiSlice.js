import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user" }),
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: (userInfo) => ({
        url: `update/${userInfo.id}`,
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
        url: `delete/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
    getAllUser: builder.mutation({
      query: () => ({
        url: "getusers",
        method: "GET",
        credentials: "include",
      }),
    }),
    showMoreUsers: builder.mutation({
      query: (startIndex) => ({
        url: `getusers?startIndex=${startIndex}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deleteuser/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
    getUserById: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useDeleteUserAccountMutation,
  useGetAllUserMutation,
  useShowMoreUsersMutation,
  useDeleteUserMutation,
  useGetUserByIdMutation,
} = userApi;
