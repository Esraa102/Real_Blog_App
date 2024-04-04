import { useSelector } from "react-redux";
import { MdEditSquare } from "react-icons/md";
const UploadImgProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mt-2">
      <div className="relative w-fit mx-auto">
        <img
          src={currentUser.imgProfile}
          alt="img-profile"
          className="w-[160px] h-[160px] rounded-full object-cover"
        />
        <form>
          <input
            type="file"
            accept="jpg,png,jpeg"
            id="img"
            className="hidden"
          />
          <label htmlFor="img" className="file-label">
            <MdEditSquare size={24} />
          </label>
        </form>
      </div>
      <h2 className="text-center my-6 text-2xl font-bold text-main capitalize">
        {currentUser.username}
      </h2>
    </div>
  );
};

export default UploadImgProfile;
