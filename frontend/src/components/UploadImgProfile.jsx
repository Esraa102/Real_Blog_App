/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdEditSquare } from "react-icons/md";
import { uploadImg } from "../utils/uploadImgFunc";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UploadImgProfile = ({ imgUrl, setImgUrl }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgFile, setImgFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleOnChangeImg = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (imgFile) {
      uploadImg(imgFile, setImgUrl, setUploadProgress);
    }
  }, [imgFile]);
  return (
    <div className="mt-2">
      <div className="relative w-fit mx-auto">
        {uploadProgress > 0 && (
          <CircularProgressbar
            value={uploadProgress}
            strokeWidth={4}
            styles={{
              root: {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              },
            }}
          />
        )}
        <img
          src={imgUrl}
          alt="img-profile"
          className="w-[160px] h-[160px] rounded-full object-cover"
        />
        <form>
          <input
            type="file"
            accept="image/*"
            onChange={handleOnChangeImg}
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
