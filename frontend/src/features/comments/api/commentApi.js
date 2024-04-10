import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApiSlice = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/comments" }),
  tagTypes: ["Comments"],
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
      invalidatesTags: ["Comments"],
    }),
    getPostComments: builder.query({
      query: (postId) => `getPostComments/${postId}`,
      providesTags: ["Comments"],
    }),
    likeComment: builder.mutation({
      query: (commentId) => ({
        url: `likeComment/${commentId}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
  useLikeCommentMutation,
} = commentApiSlice;
