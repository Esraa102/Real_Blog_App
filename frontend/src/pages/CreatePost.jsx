/* eslint-disable react-hooks/exhaustive-deps */
import { PostForm } from "../components";
import { useEffect, useState } from "react";
import { useCreatePostMutation } from "../features/posts/api/postsApiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const CreatePost = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [createPost, { data, isSuccess, isLoading, error }] =
    useCreatePostMutation();
  const createNewPost = (postData) => {
    createPost(postData);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Post Created Successfully");
        console.log(data.postData);
        navigate(`/posts/${data.postData.slug}`);
      }
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [error, isSuccess]);
  return (
    <section className="container mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="bg-glass px-4 py-6 rounded-md">
        <h1 className="text-3xl font-bold text-main mb-6">Create New Post</h1>
        <PostForm
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          sendData={createNewPost}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default CreatePost;
