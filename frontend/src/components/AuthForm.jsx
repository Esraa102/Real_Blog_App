import { useForm } from "react-hook-form";
import { OAuthGoogle } from ".";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const AuthForm = ({ isRegister, sendData, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const emailRegex =
    /^[a-zA-Z0-9_!#$%&*=+/?^{|}~]+([.-]?[a-zA-Z0-9_!#$%&*=+/?^{|}~]+)*@\w+([.-]?\w+)*(\.\w{2,50})+$/;
  const [isPassword, setIsPassword] = useState(true);

  const onSubmit = (data) => {
    if (isRegister) {
      sendData({
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } else {
      sendData({
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-glass w-full mx-auto md:w-1/2 p-4 rounded-lg flex flex-col gap-4"
    >
      {isRegister && (
        <div className="field-container">
          <label htmlFor="name" className="label">
            Username
          </label>
          <input
            type="text"
            id="name"
            name="username"
            placeholder="Your Username"
            className={`form-input ${errors.username && "input-error"}`}
            {...register("username", {
              required: true,
              maxLength: 20,
            })}
          />
          {errors.username?.type === "required" && (
            <p className="error">Username is required</p>
          )}
          {errors.username?.type === "maxLength" && (
            <p className="error">
              Username can&apos;t be greater than 20 characters
            </p>
          )}
        </div>
      )}
      <div className="field-container w-full">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email"
          className="form-input"
          {...register("email", { required: true, pattern: emailRegex })}
        />
        {errors.email?.type === "required" && (
          <p className="error">Email is required</p>
        )}
        {errors.email?.type === "pattern" && (
          <p className="error">Invlid Email</p>
        )}
      </div>
      <div className="field-container">
        <label htmlFor="pass" className="label">
          Password
        </label>
        <div className="w-full flex-1 relative">
          <input
            type={isPassword ? "password" : "text"}
            id="pass"
            name="password"
            placeholder="Your Password"
            className="form-input w-full"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 15,
            })}
          />
          <span
            onClick={() => setIsPassword((prev) => !prev)}
            className="absolute top-1/2 
            -translate-y-1/2 right-4 
            cursor-pointer hover:text-main transition"
          >
            {isPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
          </span>
        </div>
        {errors.password?.type === "required" && (
          <p className="error">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="error">password must be greater than 8 characters</p>
        )}
        {errors.password?.type === "maxLength" && (
          <p className="error">password must be less than 15 characters</p>
        )}
      </div>
      <div className="flex items-center gap-4 flex-col md:flex-row justify-between">
        <button
          type="submit"
          disabled={loading}
          className={`main-btn flex-1 ${loading && "load-btn"}`}
        >
          {isRegister && !loading && "Create Account"}
          {isRegister && loading && "Creating account...."}
          {!isRegister && !loading && "Sign In"}
          {!isRegister && loading && "Signing In..."}
        </button>
        <span className="text-center">OR</span>
        <OAuthGoogle />
      </div>
    </form>
  );
};

export default AuthForm;
