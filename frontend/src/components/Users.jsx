/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../features/user/api/userApiSlice";
import { Link } from "react-router-dom";
import { DeleteUser, Loader, ShowMoreUsers } from ".";
import { formatDate } from "../utils/formateDate";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const Users = () => {
  const { data, isError, isLoading, isSuccess, error } = useGetAllUsersQuery();
  const [showMore, setShowMore] = useState(true);
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        console.log(data.users);
        setUsersData(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    }
    if (isError) {
      toast.error(error.data.message);
      console.log(error);
    }
  }, [isSuccess, isError, data]);
  return (
    <div className="px-3">
      <h2 className="mt-6 mb-1 text-3xl font-bold text-main">All Users</h2>
      {usersData.length === 0 && !isLoading && isSuccess && (
        <p className="text-center my-6 text-gray-400">You Have No Users</p>
      )}
      {isLoading && <Loader />}
      <div className="relative  my-6 overflow-x-auto shadow-md sm:rounded-lg">
        {!isLoading && usersData.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-white uppercase bg-[#5C4755]/40">
              <tr>
                <th scope="col" className="px-6 py-3 w-[16%]">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 w-[22%]">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 w-[22%]">
                  username
                </th>
                <th scope="col" className="px-6 py-3 w-[16%]">
                  email
                </th>
                <th scope="col" className="px-6 py-3 w-[10%]">
                  Amdin
                </th>
                <th scope="col" className="px-6 py-3 w-[10%]">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-[#150B14]  even:bg-[#261C28] even:border-[#261C28] border-b odd:border-[#150B14] "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-sm whitespace-nowrap text-gray-300"
                  >
                    {formatDate(user.createdAt)}
                  </th>
                  <td className="py-4">
                    <Link to={`/profile/${user._id}`}>
                      <img
                        src={user.imgProfile}
                        alt=""
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </Link>
                  </td>
                  <td className="px-6 hover:text-main transition text-lg capitalize font-semibold">
                    <Link to={`/profile/${user._id}`}>{user.username}</Link>
                  </td>
                  <td className="px-6 py-4 capitalize">{user.email}</td>
                  <td className="px-6 py-4 flex justify-center items-center h-[113px]">
                    {user.isAdmin ? (
                      <FaCheckCircle size={24} className="text-green-600" />
                    ) : (
                      <IoIosCloseCircle size={24} color="#f00" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <DeleteUser userId={user._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showMore && !isLoading && !isError && (
        <ShowMoreUsers
          usersData={usersData}
          setUsersData={setUsersData}
          setShowMore={setShowMore}
        />
      )}
    </div>
  );
};

export default Users;
