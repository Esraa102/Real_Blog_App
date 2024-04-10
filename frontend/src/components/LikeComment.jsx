/* eslint-disable react-hooks/exhaustive-deps */
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useLikeCommentMutation } from "../features/comments/api/commentApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const LikeComment = ({ commentId, numberOfLiked, isUserLiked }) => {
  const [likeComment, { data, isError, isSuccess, error }] =
    useLikeCommentMutation();
  const [likes, setLikes] = useState(numberOfLiked);
  const [isLiked, setIsLiked] = useState(isUserLiked);
  const handleLikeComment = () => {
    likeComment(commentId);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setLikes(data.numberOfLiked);
        setIsLiked((prev) => !prev);
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, isSuccess, commentId]);
  return (
    <button
      type="button"
      onClick={handleLikeComment}
      className="flex gap-1 items-center text-gray-400"
    >
      {isLiked ? (
        <AiFillLike size={20} color="#f00" />
      ) : (
        <AiOutlineLike size={18} className="hover:text-blue-600 transition" />
      )}
      <span>{likes}</span>
    </button>
  );
};

export default LikeComment;
