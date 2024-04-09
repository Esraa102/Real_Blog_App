/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteAccountSuccess } from "../features/auth/userSlice";
import { useDeleteUserAccountMutation } from "../features/user/api/userApiSlice";
import { useEffect } from "react";

const DeleteAccount = () => {
  const {
    currentUser: { _id: id },
  } = useSelector((state) => state.user);
  const [deleteUserAccount, { data, error, isSuccess, isLoading }] =
    useDeleteUserAccountMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteUser = () => {
    deleteUserAccount(id);
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(deleteAccountSuccess());
      toast.success(data.res);
      navigate("/sign-in");
    }
    if (error) {
      toast.error(error.message);
    }
  }, [error, isSuccess]);
  return (
    <button
      type="button"
      onClick={deleteUser}
      disabled={isLoading}
      className={`main-btn block bg-red-600 border-red-600 hover:text-white hover:bg-red-800 hover:border-red-800 ${
        isLoading && "load-btn"
      } `}
    >
      Delete Account
    </button>
  );
};

export default DeleteAccount;
