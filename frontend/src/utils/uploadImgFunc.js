import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/googleAuth";
import toast from "react-hot-toast";

export const uploadImg = async (imgFile, setImgUrl, setUploadProgress) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + imgFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imgFile);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
