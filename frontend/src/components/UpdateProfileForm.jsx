import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LogOut, DeleteAccount } from ".";

const UpdateProfileForm = ({ sendData, imgUrl }) => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    sendData({
      id: currentUser._id,
      imgProfile: imgUrl,
      username: data.username,
      password: data.newPass.length !== 0 ? data.newPass : null,
    });
    console.log(data, imgUrl);
  };
  return (
    <div className="my-8 w-full md:w-[80%] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="field-container">
          <input
            type="text"
            name="username"
            className={`form-input text-lg ${errors.username && "input-error"}`}
            defaultValue={currentUser.username}
            {...register("username", { required: true, maxLength: 20 })}
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
        <div className="field-container">
          <input
            type="email"
            name="email"
            className="form-input text-lg opacity-35 focus:border-none"
            defaultValue={currentUser.email}
            readOnly
          />
          <p className="error text-yellow-500">
            If You Want To Change Your Email Then You Have to create a new
            account
          </p>
        </div>
        <div className="field-container">
          <input
            type="password"
            name="newPass"
            className={`form-input text-lg ${errors.newPass && "input-error"}`}
            placeholder="Enter New Password"
            {...register("newPass", { minLength: 8, maxLength: 15 })}
          />
          {errors.password?.type === "minLength" && (
            <p className="error">password must be greater than 8 characters</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="error">password must be less than 15 characters</p>
          )}
        </div>
        <button type="submit" className="main-btn">
          Update Profile
        </button>
      </form>
      <div className="mt-8 flex gap-4 items-center flex-wrap justify-between">
        <DeleteAccount />
        <LogOut full={false} />
      </div>
    </div>
  );
};

export default UpdateProfileForm;
