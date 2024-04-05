import { UpdateProfileForm, UploadImgProfile } from ".";
import { useState } from "react";
const Profile = () => {
  const [imgUrl, setImgUrl] = useState(null);

  return (
    <div>
      <UploadImgProfile imgUrl={imgUrl} setImgUrl={setImgUrl} />
      <UpdateProfileForm />
    </div>
  );
};

export default Profile;
