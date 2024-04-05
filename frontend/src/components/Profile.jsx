import { useSelector } from "react-redux";
import { UpdateProfileForm, UploadImgProfile } from ".";
import { useState } from "react";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgUrl, setImgUrl] = useState(currentUser.imgProfile);

  return (
    <div>
      <UploadImgProfile imgUrl={imgUrl} setImgUrl={setImgUrl} />
      <UpdateProfileForm />
    </div>
  );
};

export default Profile;
