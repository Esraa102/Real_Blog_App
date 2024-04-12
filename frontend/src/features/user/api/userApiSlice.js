import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://real-blog-app-1.onrender.com/api/user",
  }),
  tagTypes: ["Users"],
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
      invalidatesTags: ["Users"],
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
      invalidatesTags: ["Users"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "getusers",
        credentials: "include",
      }),
      providesTags: ["Users"],
    }),
    showMoreUsers: builder.mutation({
      query: (startIndex) => ({
        url: `getusers?startIndex=${startIndex}`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
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
      invalidatesTags: ["Users"],
    }),
    getUsrById: builder.query({
      query: (userId) => ({
        url: `user/${userId}`,
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useDeleteUserAccountMutation,
  useGetAllUsersQuery,
  useShowMoreUsersMutation,
  useDeleteUserMutation,
  useGetUsrByIdQuery,
} = userApi;
