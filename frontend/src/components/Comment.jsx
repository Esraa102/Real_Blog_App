import { Link } from "react-router-dom";
import moment from "moment";
import { DeleteComment, EditComment, LikeComment } from ".";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.content);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 bg-[#261C28]/80 mb-4 rounded-md flex items-center gap-4 flex-wrap">
      <Link to={`/profile/${comment?.author.userId}`}>
        <img
          src={comment?.author.imgProfile}
          alt="img-profile"
          className="w-14 h-14 rounded-full object-cover"
        />
      </Link>
      <div className="flex-1">
        <div className="flex gap-1 items-center">
          <Link
            to={`/profile/${comment?.author.userId}`}
            className="text-sm font-bold -mt-[2px] hover:underline text-blue-500"
          >
            @{comment?.author.username}
          </Link>
          <span className="text-xs text-gray-500">
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <EditComment
            editedContent={editedContent}
            setEditedContent={setEditedContent}
            setIsEditing={setIsEditing}
            commentId={comment?._id}
            userId={comment?.author.userId}
          />
        ) : (
          <p className="mt-2">{comment?.content}</p>
        )}
        {currentUser && (
          <div className="mt-3 flex items-center gap-4 flex-wrap">
            <LikeComment
              commentId={comment?._id}
              numberOfLiked={comment?.numberOfLiked}
              isUserLiked={comment?.likes.includes(currentUser._id)}
            />
            {currentUser._id === comment.author.userId && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-700 transition"
              >
                <FaEdit size={18} />
              </button>
            )}
            {(currentUser._id === comment.author.userId ||
              currentUser.isAdmin) && (
              <DeleteComment
                commentId={comment?._id}
                userId={comment?.author.userId}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
