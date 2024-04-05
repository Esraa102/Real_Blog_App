/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdEditSquare } from "react-icons/md";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/googleAuth";
import toast from "react-hot-toast";

const UploadImgProfile = ({ imgUrl, setImgUrl }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgFile, setImgFile] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const handleOnChangeImg = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
    }
  };
  const uploadImg = async () => {
    const storage = getStorage(app);
    const imgName = new Date().getTime() + imgFile.name;
    const storageRef = ref(storage, imgName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
        console.log(`uploading ${progress} %`);
      },
      (error) => {
        console.log(error);
        toast.error("Can't Upload Image (Must Be Less Than 2MB)");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgUrl(downloadUrl);
          toast.success("Image Uploaded Successfully");
        });
      }
    );
  };
  useEffect(() => {
    if (imgFile) {
      uploadImg();
    }
  }, [imgFile]);
  return (
    <div className="mt-2">
      <div className="relative w-fit mx-auto">
        <img
          src={imgUrl || currentUser.imgProfile}
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
      {uploadProgress > 0 && (
        <p
          className={`text-center font-semibold mt-3 text-sm ${
            uploadProgress === 100 ? "text-green-600" : "text-yellow-500"
          }`}
        >
          Uploading {uploadProgress} %
        </p>
      )}
      <h2 className="text-center my-6 text-2xl font-bold text-main capitalize">
        {currentUser.username}
      </h2>
    </div>
  );
};

export default UploadImgProfile;
