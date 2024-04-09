/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Loader, PostForm } from "../components";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetPostByIdMutation,
  useUpdatePostMutation,
} from "../features/posts/api/postsApiSlice";

const EditPost = () => {
  const { id } = useParams();
  const [defaultValues, setDefaultValues] = useState({});
  const [
    getPostById,
    {
      data: currentPostData,
      isError,
      error,
      isSuccess: isGettingSuccess,
      isLoading: isGettingPost,
    },
  ] = useGetPostByIdMutation();
  const [
    updatePost,
    {
      data: updatedPost,
      isLoading: isUpdating,
      isError: isErrorUpdating,
      error: updatingError,
      isSuccess: isUpdatingSuccess,
    },
  ] = useUpdatePostMutation();
  const [imgUrl, setImgUrl] = useState(null);
  const sendData = (info) => {
    updatePost({
      postId: id,
      ...info,
    });
  };
  useEffect(() => {
    getPostById(id);
  }, [id]);
  useEffect(() => {
    if (isUpdatingSuccess) {
      console.log(updatedPost);
      toast.success("Updated Successfully");
    }
    if (isErrorUpdating) {
      toast.error(updatingError.data.message);
    }
  }, [isErrorUpdating, isUpdatingSuccess, id]);
  useEffect(() => {
    if (isGettingSuccess && !currentPostData.message) {
      setDefaultValues({
        title: currentPostData.post.title,
        content: currentPostData.post.content,
        category: currentPostData.post.category,
      });
      console.log(currentPostData);
      setImgUrl(currentPostData.post.image);
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isGettingSuccess, isError]);
  return (
    <section className="container mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="bg-glass px-4 py-6 rounded-md">
        <h1 className="text-3xl font-bold text-main mb-6">Update A Post</h1>
        {isGettingPost && !Object.keys(defaultValues).length && <Loader />}
        {!isGettingPost &&
          isGettingSuccess &&
          Object.keys(defaultValues).length > 0 && (
            <PostForm
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              defaultValues={defaultValues}
              sendData={sendData}
              isUpdate={true}
              isLoading={isUpdating}
            />
          )}
      </div>
    </section>
  );
};

export default EditPost;
