/* eslint-disable react-hooks/exhaustive-deps */
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase/googleAuth";
import { useGoogleAuthMutation } from "../features/auth/api/authApiSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { googleAuthSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const OAuthGoogle = () => {
  const auth = getAuth(app);
  const [googleAuth, { error, isSuccess, data, isLoading }] =
    useGoogleAuthMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleAuthHandler = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const { user } = await signInWithPopup(auth, provider);
      googleAuth({
        username: user.displayName,
        email: user.email,
        imgProfile: user.photoURL,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      dispatch(googleAuthSuccess(data.userData));
      toast.success("User Authenticated Successfully");
      navigate("/");
    }
  }, [error, isSuccess]);
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={googleAuthHandler}
      className={`google-btn ${isLoading && "google-btn-load"}`}
    >
      <FaGoogle size={25} />
      <span>{isLoading ? "Wait a Second..." : "Continue With Google"}</span>
    </button>
  );
};

export default OAuthGoogle;
