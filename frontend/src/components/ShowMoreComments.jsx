/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useShowMoreCommentsMutation } from "../features/comments/api/commentApi";
import toast from "react-hot-toast";
import { Loader } from ".";
const ShowMoreComments = ({ commentsData, setCommentsData, setShowMore }) => {
  const [showMoreComments, { data, isError, isSuccess, error, isLoading }] =
    useShowMoreCommentsMutation();
  const handleShowMore = () => {
    const startIndex = commentsData?.length;
    console.log(startIndex);
    showMoreComments(startIndex);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        if (data.comments.length === 0) {
          setShowMore(false);
        }
        console.log(data.comments);
        setCommentsData(() => [...commentsData, ...data.comments]);
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, isSuccess]);
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <button
          type="button"
          onClick={handleShowMore}
          className="mt-8 mb-4 mx-auto block w-fit underline font-semibold cursor-pointer text-lg  text-gray-300 hover:text-main transition"
        >
          Show More
        </button>
      )}
    </>
  );
};

export default ShowMoreComments;
