import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/posts" }),
  endpoints: (builder) => ({
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
    }),
  }),
});

export const { useCreatePostMutation } = postsApiSlice;
