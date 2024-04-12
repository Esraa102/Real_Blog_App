/* eslint-disable react-hooks/exhaustive-deps */
import { useShowMoreResultsMutation } from "../features/posts/api/postsApiSlice";
import { useEffect } from "react";
import { Loader } from ".";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
const ShowMoreResult = ({ posts, setPosts }) => {
  const location = useLocation();
  const [ShowMoreResults, { data, isError, isLoading, error, isSuccess }] =
    useShowMoreResultsMutation();
  const handleShowMore = () => {
    const startIndex = posts?.length;
    const url = new URLSearchParams(location.search);
    url.set("startIndex", startIndex);
    const searchQuery = url.toString();
    ShowMoreResults(searchQuery);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setPosts(() => [...posts, ...data.posts]);
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, isSuccess]);
  return (
    <>
      {isLoading && <Loader />}
      {!isSuccess && !isLoading && (
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

export default ShowMoreResult;
