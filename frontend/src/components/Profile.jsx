import { useSelector } from "react-redux";
import Posts from "./Posts";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <img
        src={currentUser.imgProfile}
        alt="img-profile"
        className="w-[160px] h-[160px] mx-auto my-6 rounded-full object-cover"
      />
      <h2 className="text-center mt-6 mb-1 text-2xl font-bold text-main capitalize">
        {currentUser.username}
      </h2>
      <p className="text-center">{currentUser.email}</p>
      <div>
        <h3 className="text-2xl text-main mt-8 -mb-3 font-bold"> Your Posts</h3>
        <Posts term={"userId"} value={currentUser._id} showAuthor={false} />
      </div>
    </div>
  );
};

export default Profile;
