import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApiSlice = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/posts" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPostById: builder.mutation({
      query: (postId) => ({
        url: `post/${postId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
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
    showMorePosts: builder.mutation({
      query: (queryTerms) => ({
        url: `getposts?${queryTerms.term}=${queryTerms.value}&startIndex=${queryTerms.length}`,
        method: "GET",
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (info) => ({
        url: `delete/${info.postId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: info,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: (info) => ({
        url: `/update/${info.postId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: info,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsMutation,
  useShowMorePostsMutation,
  useDeletePostMutation,
  useGetPostByIdMutation,
  useUpdatePostMutation,
} = postsApiSlice;
