import { Link } from "react-router-dom";
import { AuthForm } from "../components";

const Login = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="my-6 text-2xl font-bold">Welcome Back!</h1>
      <AuthForm isRegister={false} />
      <p className="text-gray-200">
        Don&apos;t have an account?{" "}
        <Link
          to={"/sign-up"}
          className="font-semibold underline hover:text-main transition"
        >
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default Login;
