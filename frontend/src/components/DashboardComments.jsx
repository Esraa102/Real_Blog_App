/* eslint-disable react-hooks/exhaustive-deps */
import { useGetAllCommentsMutation } from "../features/comments/api/commentApi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { DeleteComment, Loader, ShowMoreComments } from ".";
import { formatDate } from "../utils/formateDate";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
const DashboardComments = () => {
  const [getAllComments, { data, isError, isLoading, isSuccess, error }] =
    useGetAllCommentsMutation();
  const [showMore, setShowMore] = useState(true);
  const [commentsData, setCommentsData] = useState([]);
  useEffect(() => {
    getAllComments();
  }, []);
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setCommentsData(data.comments);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, data]);
  return (
    <div className="px-3">
      <h2 className="mt-6 mb-1 text-3xl font-bold text-main">All Comments</h2>
      {commentsData.length === 0 && !isLoading && isSuccess && (
        <p className="text-center my-6 text-gray-400">There Are No Comments!</p>
      )}
      {isLoading && <Loader />}
      <div className="relative  my-6 overflow-x-auto shadow-md sm:rounded-lg">
        {!isLoading && commentsData.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-white uppercase bg-[#5C4755]/40">
              <tr>
                <th scope="col" className="px-6 py-3 w-[16%]">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 w-[22%]">
                  Content
                </th>
                <th scope="col" className="px-6 py-3 w-[22%]">
                  Number Of Likes
                </th>
                <th scope="col" className="px-6 py-3 w-[16%]">
                  Post Id
                </th>
                <th scope="col" className="px-6 py-3 w-[10%]">
                  Creator
                </th>
                <th scope="col" className="px-6 py-3 w-[10%]">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {commentsData.map((comment) => (
                <tr
                  key={comment._id}
                  className="odd:bg-[#150B14]  even:bg-[#261C28] even:border-[#261C28] border-b odd:border-[#150B14] "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-sm whitespace-nowrap text-gray-300"
                  >
                    {formatDate(comment.createdAt)}
                  </th>
                  <td className="py-4">
                    <span className="text-gray-400">
                      {comment.content.slice(0, 30)}...
                    </span>
                  </td>
                  <td className="px-6 flex gap-2 items-center justify-center">
                    <AiFillLike size={20} />
                    <span>{comment.numberOfLiked}</span>
                  </td>
                  <td className="px-6 py-4 hover:text-blue-600 transition">
                    <Link to={`/posts/${comment.postId}`}>
                      {comment.postId}
                    </Link>
                  </td>
                  <td className="px-6 py-4 flex justify-center items-center h-[113px]">
                    <Link to={`/profile/${comment.author.userId}`}>
                      <img
                        src={comment.author.imgProfile}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <DeleteComment
                      commentId={comment._id}
                      userId={comment.author.userId}
                      commentsData={commentsData}
                      setCommentsData={setCommentsData}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showMore && !isLoading && !isError && (
        <ShowMoreComments
          commentsData={commentsData}
          setCommentsData={setCommentsData}
          setShowMore={setShowMore}
        />
      )}
    </div>
  );
};

export default DashboardComments;
