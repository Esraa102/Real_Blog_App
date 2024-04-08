/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useShowMorePostsMutation } from "../features/posts/api/postsApiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const ShowMoreBtn = ({ userPosts, setPostsData }) => {
  const {
    currentUser: { _id: userId },
  } = useSelector((state) => state.user);
  const [showMorePosts, { data, isSuccess, error, isLoading }] =
    useShowMorePostsMutation();
  const handleShowMore = () => {
    const startIndex = userPosts?.length;
    showMorePosts({ term: "userId", value: userId, length: startIndex });
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setPostsData(() => [...userPosts, ...data.posts]);
      }
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [error, isSuccess, userId]);
  return (
    <>
      {isLoading && <p>Loading...</p>}
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

export default ShowMoreBtn;
