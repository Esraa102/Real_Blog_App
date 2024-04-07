/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { uploadImg } from "../utils/uploadImgFunc";
const UploadPostImg = ({ imgUrl, setImgUrl }) => {
  const [imgFile, setImgFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleChange = (e) => {
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
    <div>
      <p className="label text-lg md:text-xl mb-3">Choose Post Image</p>
      <div className="form-input border-2 border-dashed border-main rounded-lg mt-2 w-full p-4 flex flex-col gap-4">
        {imgUrl && (
          <img
            src={imgUrl}
            alt="post-img"
            className="w-full h-[350px] object-cover rounded-xl"
          />
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <p className="text-sm text-center -mt-3 text-yellow-500 font-semibold">
            Uploading {uploadProgress}%
          </p>
        )}
        <label
          htmlFor="postImg"
          className="flex items-center gap-2 cursor-pointer secondary-btn "
        >
          <FaImage size={20} /> Choose Image
        </label>
        <p className="text-gray-600 -mt-3 text-center text-sm">
          (jpg, png, jpeg) only
        </p>
        <input
          type="file"
          id="postImg"
          onChange={handleChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UploadPostImg;
