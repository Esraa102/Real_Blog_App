/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfileForm, UploadImgProfile } from ".";
import { useUpdateUserProfileMutation } from "../features/user/api/userApiSlice";
import { updateProfileSuccess } from "../features/auth/userSlice";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgUrl, setImgUrl] = useState(currentUser.imgProfile);
  const dispatch = useDispatch();
  const [updateProfile, { error, data, isSuccess }] =
    useUpdateUserProfileMutation();
  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      dispatch(updateProfileSuccess(data.userData));
      toast.success("Update Successfully");
    }
  }, [error, isSuccess]);
  return (
    <div>
      <UploadImgProfile imgUrl={imgUrl} setImgUrl={setImgUrl} />
      <UpdateProfileForm sendData={updateProfile} imgUrl={imgUrl} />
    </div>
  );
};

export default UpdateProfile;
