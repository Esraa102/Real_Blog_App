/* eslint-disable react-hooks/exhaustive-deps */
import { MdDeleteForever } from "react-icons/md";
import { useDeleteCommentMutation } from "../features/comments/api/commentApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
const DeleteComment = ({
  commentId,
  userId,
  commentsData,
  setCommentsData,
}) => {
  const [deleteComment, { data, isError, isSuccess, error, isLoading }] =
    useDeleteCommentMutation();
  const handleDeleteComment = () => {
    deleteComment({ commentId, userId });
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        console.log(commentsData);
        if (commentsData) {
          setCommentsData(() =>
            commentsData.filter((comment) => {
              return comment._id !== commentId;
            })
          );
        }
        toast.success(data);
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [commentId, userId, isError, isSuccess]);
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleDeleteComment}
      className={`text-gray-400 hover:text-red-700 transition ${
        isLoading && "load-btn"
      }`}
    >
      <MdDeleteForever size={20} />
    </button>
  );
};

export default DeleteComment;
