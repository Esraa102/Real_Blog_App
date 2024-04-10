/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useGetPostCommentsQuery } from "../features/comments/api/commentApi";
import toast from "react-hot-toast";
import { DeleteComment, EditComment, LikeComment, Loader } from ".";
import { Link } from "react-router-dom";
import moment from "moment";

const Comments = ({ postId }) => {
  const { data, isError, isSuccess, isLoading, error } =
    useGetPostCommentsQuery(postId);
  const { currentUser } = useSelector((state) => state.user);
  if (isError) {
    toast.error(error.data.message);
  }
  if (data?.message) {
    toast.error(data?.message);
  }
  return (
    <div className="mx-auto max-w-4xl p-4 rounded-md bg-[#5C4755]/40 my-8 h-[400px] overflow-y-auto">
      {isLoading && <Loader />}
      {!isLoading && isSuccess && (
        <div>
          <p className="mb-4 mx-0 secondary-btn text-sm">
            Comments [{data.comments?.length}]
          </p>
          <div>
            {data.comments?.map((comment) => (
              <div
                key={comment?._id}
                className="p-3 bg-[#261C28]/80 mb-4 rounded-md flex items-center gap-4 flex-wrap"
              >
                <Link to={`/profile/${comment?.author.userId}`}>
                  <img
                    src={comment?.author.imgProfile}
                    alt="img-profile"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </Link>
                <div>
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
                  <p className="mt-2">{comment?.content}</p>
                  {currentUser && (
                    <div className="mt-3 flex items-center gap-4 flex-wrap">
                      <LikeComment
                        commentId={comment?._id}
                        numberOfLiked={comment?.numberOfLiked}
                        isUserLiked={comment?.likes.includes(currentUser._id)}
                      />
                      {currentUser._id === comment.author.userId && (
                        <EditComment commentId={comment?._id} />
                      )}
                      {currentUser._id === comment.author.userId && (
                        <DeleteComment commentId={comment?._id} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isLoading && !data?.comments.length && (
        <p className="text-center text-gray-400">There Are No Comments Yet!</p>
      )}
    </div>
  );
};

export default Comments;
