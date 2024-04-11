/* eslint-disable react-hooks/exhaustive-deps */
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDeleteUserMutation } from "../features/user/api/userApiSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
const DeleteUser = ({ userId }) => {
  const [deleteUser, { data, isError, error, isSuccess, isLoading }] =
    useDeleteUserMutation();
  const handleDeleteUser = () => {
    deleteUser(userId);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        console.log(data);
        toast.success(data);
      }
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, data]);
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleDeleteUser}
      className={`text-[#f00] hover:text-red-600 transition ${
        isLoading && "cursor-not-allowed opacity-50"
      } `}
    >
      <RiDeleteBin6Fill size={26} />
    </button>
  );
};

export default DeleteUser;
