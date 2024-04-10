/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useCreateCommentMutation } from "../features/comments/api/commentApi";
import toast from "react-hot-toast";
import Comments from "./Comments";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [createComment, { data, isError, error, isSuccess, isLoading }] =
    useCreateCommentMutation();
  const [comment, setComment] = useState("");
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      createComment({
        postId,
        content: comment,
        author: {
          userId: currentUser._id,
          imgProfile: currentUser.imgProfile,
          username: currentUser.username,
        },
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        console.log(data);
        setComment("");
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, isSuccess, postId, currentUser]);
  return (
    <div className="w-full max-w-4xl mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-3 my-6">
          <p className="text-gray-400">Signed in as:</p>
          <div className="flex gap-1 items-center">
            <img
              src={currentUser.imgProfile}
              alt="img-profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <Link
              to={"/dashboard?tab=profile"}
              className="text-cyan-600 font-semibold hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center p-4 rounded-md w-fit mx-auto bg-[#5C4755]/40">
          <p className="text-gray-400 mb-4 font-semibold">
            You must sign in to comment
          </p>
          <Link to={"/sign-in"} className="main-btn">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSumbit} className="flex flex-col gap-3">
          <div className="relative">
            <textarea
              name="comment"
              id=""
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="form-input w-full h-[100px] resize-none"
              maxLength={200}
            ></textarea>
            <span
              className={`text-xs absolute text-gray-300 px-2 py-1 border 
              border-main rounded-md bottom-4 right-2
              ${comment.length === 200 && "opacity-40"}`}
            >
              {comment.length}/200
            </span>
          </div>
          <button
            type="sumbit"
            disabled={isLoading}
            className={`main-btn w-fit self-end ${isLoading && "load-btn"}`}
          >
            <IoSend size={22} />
          </button>
        </form>
      )}
      <Comments postId={postId} />
    </div>
  );
};

export default CommentSection;
