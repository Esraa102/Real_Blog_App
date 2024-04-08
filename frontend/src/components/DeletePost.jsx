/* eslint-disable react-hooks/exhaustive-deps */
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDeletePostMutation } from "../features/posts/api/postsApiSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

const DeletePost = ({ postId, postsData, setPostsData }) => {
  const {
    currentUser: { _id: userId },
  } = useSelector((state) => state.user);
  const [deletePost, { data, isSuccess, error, isLoading }] =
    useDeletePostMutation();
  const handleDeletePost = () => {
    deletePost({ userId, postId });
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setPostsData(() =>
          postsData.filter((post) => {
            return post._id !== postId;
          })
        );
        toast.success(data);
      }
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error, data]);
  return (
    <button
      onClick={handleDeletePost}
      disabled={isLoading}
      type="button"
      className={`text-[#f00] hover:text-red-700 transition ${
        isLoading && "cursor-not-allowed opacity-40"
      }`}
    >
      <RiDeleteBin5Fill size={26} />
    </button>
  );
};

export default DeletePost;
