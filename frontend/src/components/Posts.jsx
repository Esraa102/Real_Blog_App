/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetAllUserPostsMutation } from "../features/posts/api/postsApiSlice";
import toast from "react-hot-toast";
import { Loader, PostCard } from ".";

const Posts = ({ term, value, showAuthor }) => {
  const [getAllUserPosts, { data, isError, error, isSuccess, isLoading }] =
    useGetAllUserPostsMutation();
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    getAllUserPosts({ term, value });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setUserPosts(data.posts);
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);
  return (
    <div className="my-10">
      {!isLoading && !userPosts.length && (
        <p className="text-center my-4 text-gray-400">This User Has No Posts</p>
      )}
      {isLoading && <Loader />}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {userPosts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.title}
            content={post.content}
            image={post.image}
            category={post.category}
            author={post.author}
            showAuthor={showAuthor}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
