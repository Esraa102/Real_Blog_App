import { Link } from "react-router-dom";
import { AuthForm } from "../components";

const Register = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="my-6 text-2xl font-bold">Create A New Account</h1>
      <AuthForm register />
      <p className="text-gray-200">
        Already have an account?{" "}
        <Link
          to={"/sign-in"}
          className="font-semibold underline hover:text-main transition"
        >
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default Register;
