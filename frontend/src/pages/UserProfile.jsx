/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import { useGetUserByIdMutation } from "../features/user/api/userApiSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../components";
import { formatDate } from "../utils/formateDate";
const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [getUserById, { data, isError, error, isSuccess, isLoading }] =
    useGetUserByIdMutation();
  useEffect(() => {
    getUserById(id);
  }, [id]);
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        console.log(data);
        setUser(data.userData);
        console.log(user);
      }
    }
    if (isError) {
      console.log(error);
      toast.error(error.data.message);
    }
  }, [isError, isSuccess]);
  return (
    <section className="container mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="bg-glass px-4 py-6 rounded-md">
        {isLoading && <Loader />}
        {!isLoading && isSuccess && (
          <>
            <div className="relative">
              <img
                src={user?.imgProfile}
                alt="user-img"
                className="w-[200px] h-[200px] object-cover rounded-full mx-auto border-4 border-main"
              />
              <p className="text-center mt-4 mb-2 capitalize font-bold text-main text-3xl">
                {user?.username}
              </p>
              <p className="text-center mb-2 text-lg text-gray-300">
                {user?.email}
              </p>
              <p className="text-sm text-center text-gray-500">
                Join Date: {formatDate(user?.createdAt)}
              </p>
              <span
                className="px-4 py-2 bg-slate-900 text-main font-semibold
              text-lg rounded-md absolute top-0 right-2 border-main border"
              >
                {user?.isAdmin ? "Admin" : "User"}
              </span>
            </div>
            <Posts userId={id} />
          </>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
