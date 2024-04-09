/* eslint-disable react-hooks/exhaustive-deps */
import { useShowMoreUsersMutation } from "../features/user/api/userApiSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
const ShowMoreUsers = ({ usersData, setUsersData }) => {
  const [ShowMoreUsers, { data, isError, error, isLoading, isSuccess }] =
    useShowMoreUsersMutation();
  const handleShowMore = () => {
    const startIndex = usersData?.length;
    ShowMoreUsers(startIndex);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setUsersData(() => [...usersData, ...data.users]);
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

export default ShowMoreUsers;
