/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formateDate";
import { useSelector } from "react-redux";
import { DeletePost, Loader, ShowMoreBtn } from ".";
import { FaEdit } from "react-icons/fa";
import { useGetPostsMutation } from "../features/posts/api/postsApiSlice";
import toast from "react-hot-toast";

const DashboardPosts = () => {
  const {
    currentUser: { _id: userId },
  } = useSelector((state) => state.user);
  const [getPosts, { data, error, isLoading, isSuccess }] =
    useGetPostsMutation();
  const [postsData, setPostsData] = useState([]);
  const [showMore, setShowMore] = useState(true);
  useEffect(() => {
    getPosts({ term: "userId", value: userId });
  }, [userId]);
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        setPostsData(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    }
    if (error) {
      toast.error(error.error);
    }
  }, [isSuccess, error, userId, data]);

  return (
    <div className="px-3">
      <h2 className="mt-6 mb-1 text-3xl font-bold text-main">All Posts</h2>
      {postsData.length === 0 && !isLoading && isSuccess && (
        <p className="text-center my-6 text-gray-400">You Have No Posts</p>
      )}
      {isLoading && <Loader />}
      <div className="relative  my-6 overflow-x-auto shadow-md sm:rounded-lg">
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
                    <Link to={`/posts/${post._id}`}>
                      <img
                        src={post.image}
                        alt=""
                        className="w-40 h-20 rounded-md"
                      />
                    </Link>
                  </td>
                  <td className="px-6 hover:text-main transition text-lg capitalize font-semibold">
                    <Link to={`/posts/${post._id}`}>
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
                    <DeletePost
                      postId={post._id}
                      postsData={postsData}
                      setPostsData={setPostsData}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showMore && !isLoading && (
        <ShowMoreBtn userPosts={postsData} setPostsData={setPostsData} />
      )}
    </div>
  );
};

export default DashboardPosts;
