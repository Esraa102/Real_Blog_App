/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useGetPostsMutation } from "../features/posts/api/postsApiSlice";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formateDate";
import { useSelector } from "react-redux";
const Posts = () => {
  const {
    currentUser: { _id: userId },
  } = useSelector((state) => state.user);
  const [getPosts, { data, error, isLoading, isSuccess }] =
    useGetPostsMutation();
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    getPosts({ term: "userId", value: userId });
  }, [userId]);
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setPostsData(data.posts);
      }
    }
    if (error) {
      toast.error(error.message);
    }
  }, [isSuccess, error, userId]);

  return (
    <div>
      <h2 className="mt-6 mb-1 text-3xl font-bold text-main">All Posts</h2>
      {postsData.length === 0 && !isLoading && (
        <p className="text-center my-6 text-gray-400">You Have No Posts</p>
      )}
      <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
        {isLoading && !postsData && <div>Loading...</div>}
        {!isLoading && postsData.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-white uppercase bg-[#5C4755]/40">
              <tr>
                <th scope="col" className="px-6 py-3 w-[16%]">
                  Updated Date
                </th>
                <th scope="col" className="px-6 py-3 w-[22%]">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 w-[22%]">
                  Post Title
                </th>
                <th scope="col" className="px-6 py-3 w-[16%]">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 w-[10%]">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3 w-[10%]">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {postsData.map((post) => (
                <tr
                  key={post._id}
                  className="odd:bg-[#150B14]  even:bg-[#261C28] even:border-[#261C28] border-b odd:border-[#150B14] "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-sm whitespace-nowrap text-gray-300"
                  >
                    {formatDate(post.updatedAt)}
                  </th>
                  <td className="py-4">
                    <Link to={`/posts/${post.slug}`}>
                      <img
                        src={post.image}
                        alt=""
                        className="w-40 h-20 rounded-md"
                      />
                    </Link>
                  </td>
                  <td className="px-6 hover:text-main transition text-lg capitalize font-semibold">
                    <Link to={`/posts/${post.slug}`}>
                      {`${post.title.slice(0, 20)}`}
                    </Link>
                  </td>
                  <td className="px-6 py-4 capitalize">{post.category}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/update-post/${post._id}`}
                      className="hover:text-main transition text-white"
                    >
                      <FaEdit size={26} />
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="text-[#f00] hover:text-red-700 transition"
                    >
                      <RiDeleteBin5Fill size={26} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Posts;
