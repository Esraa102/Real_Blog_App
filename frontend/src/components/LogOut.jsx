/* eslint-disable react-hooks/exhaustive-deps */
import { useLogOutUserMutation } from "../features/auth/api/authApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUserSuccess } from "../features/auth/authSlice";
import { useEffect } from "react";
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
      className={`main-btn  ${isLoading && "load-btn"}`}
    >
      Log Out
    </button>
  );
};

export default LogOut;
