/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components";
import { useRegisterUserMutation } from "../features/auth/api/authApiSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerUserSuccess } from "../features/auth/authSlice";
const Register = () => {
  const [registerUser, { isLoading, error, isSuccess, data }] =
    useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendDataToServer = (userInfo) => {
    registerUser(userInfo);
  };
  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      dispatch(registerUserSuccess(data.userData));
      toast.success("User Created Successfully");
      navigate("/");
    }
  }, [error, isSuccess]);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-white">
      <div className="container mx-auto p-4 lg:px-0">
        <h1 className="my-6 text-2xl font-bold text-center">
          Create A New Account
        </h1>
        <AuthForm isRegister sendData={sendDataToServer} loading={isLoading} />
        <p className="text-gray-200 text-center">
          Already have an account?{" "}
          <Link
            to={"/sign-in"}
            className="font-semibold underline hover:text-main transition"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
