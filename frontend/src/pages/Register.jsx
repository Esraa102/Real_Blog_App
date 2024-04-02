import { Link } from "react-router-dom";
import { AuthForm } from "../components";

const Register = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-white">
      <div className="container mx-auto p-4 lg:px-0">
        <h1 className="my-6 text-2xl font-bold text-center">
          Create A New Account
        </h1>
        <AuthForm isRegister />
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
