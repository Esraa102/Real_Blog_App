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
    editComment: builder.mutation({
      query: (info) => ({
        url: `update-comment/${info.commentId}`,
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: info,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (info) => ({
        url: `delete-comment/${info.commentId}`,
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: info,
      }),
      invalidatesTags: ["Comments"],
    }),
    getAllComments: builder.mutation({
      query: () => ({
        url: "all-comments",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Comments"],
    }),
    showMoreComments: builder.mutation({
      query: (startIndex) => ({
        url: `all-comments?startIndex=${startIndex}`,
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
  useLikeCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsMutation,
  useShowMoreCommentsMutation,
} = commentApiSlice;
