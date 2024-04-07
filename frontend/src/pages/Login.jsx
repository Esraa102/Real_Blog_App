/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components";
import { useLoginUserMutation } from "../features/auth/api/authApiSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUserSuccess } from "../features/auth/authSlice";
import toast from "react-hot-toast";
const Login = () => {
  const [loginUser, { isSuccess, error, isLoading, data }] =
    useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendDataToServer = (userInfo) => {
    loginUser(userInfo);
  };
  useEffect(() => {
    if (error) {
      toast.error(error.data?.message);
    }
    if (isSuccess) {
      console.log(data);
      dispatch(loginUserSuccess(data.userData));
      toast.success("Logged in successfully");
      navigate("/");
    }
  }, [error, isSuccess]);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-white">
      <div className="container mx-auto p-4 lg:px-0">
        <h1 className="my-6 text-2xl font-bold text-center">Welcome Back!</h1>
        <AuthForm
          isRegister={false}
          sendData={sendDataToServer}
          loading={isLoading}
        />
        <p className="text-gray-200 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to={"/sign-up"}
            className="font-semibold underline hover:text-main transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
