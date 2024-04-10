import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApiSlice = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/comments" }),
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (info) => ({
        url: "create-comment",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: info,
      }),
    }),
  }),
});

export const { useCreateCommentMutation } = commentApiSlice;
