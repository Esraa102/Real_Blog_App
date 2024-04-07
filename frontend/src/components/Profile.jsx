import { useSelector } from "react-redux";

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
    </div>
  );
};

export default Profile;
