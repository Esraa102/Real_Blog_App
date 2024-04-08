/* eslint-disable react-hooks/exhaustive-deps */
import { useLogOutUserMutation } from "../features/auth/api/authApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logOutUserSuccess } from "../features/auth/userSlice";
import { IoMdLogOut } from "react-icons/io";
const LogOut = () => {
  const [logOutUser, { data, isLoading, error, isSuccess }] =
    useLogOutUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    logOutUser();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(logOutUserSuccess());
      toast.success(data);
      navigate("/sign-in");
    }
    if (error) {
      toast.error(error.message);
    }
  }, [isSuccess, error]);
  return (
    <button
      type="button"
      onClick={logOut}
      className={`main-btn flex items-center gap-2 justify-center  ${
        isLoading && "load-btn"
      }`}
    >
      <IoMdLogOut size={24} className="visible md:hidden" />
      <span className="hidden md:inline">Log Out</span>
    </button>
  );
};

export default LogOut;
