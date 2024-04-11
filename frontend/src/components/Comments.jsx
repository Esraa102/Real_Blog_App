/* eslint-disable react-hooks/exhaustive-deps */
import { useGetPostCommentsQuery } from "../features/comments/api/commentApi";
import toast from "react-hot-toast";
import { Loader, Comment } from ".";

const Comments = ({ postId }) => {
  const { data, isError, isSuccess, isLoading, error } =
    useGetPostCommentsQuery(postId);
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
              <Comment key={comment._id} comment={comment} />
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
