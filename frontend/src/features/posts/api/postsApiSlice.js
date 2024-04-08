import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/posts" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.mutation({
      query: (queryTerm) => ({
        url: `getposts?${queryTerm.term}=${queryTerm.value}`,
        method: "GET",
      }),
      invalidatesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: postData,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsMutation } = postsApiSlice;
