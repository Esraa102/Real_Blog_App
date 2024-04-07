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
  const uploadImg = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
      },
      (error) => {
        console.log(error);
        toast.error("Could not upload image (File must be less than 2MB)");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
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
