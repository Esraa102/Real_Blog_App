/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../features/user/api/userApiSlice";
import { useGetPostsMutation } from "../features/posts/api/postsApiSlice";
import { useGetAllCommentsMutation } from "../features/comments/api/commentApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaUsers, FaLongArrowAltUp } from "react-icons/fa";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa6";
import { formatDate } from "../utils/formateDate";
import Loader from "./Loader";
const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [usersData, setUsersData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMothUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useGetAllUsersQuery();
  const [
    getPosts,
    { data: posts, isLoading: isPostsLoading, isSuccess: isPostsSuccess },
  ] = useGetPostsMutation();
  const [
    getAllComments,
    {
      data: comments,
      isError,
      error,
      isLoading: isCommentsLoading,
      isSuccess: isCommentsSuccess,
    },
  ] = useGetAllCommentsMutation();
  useEffect(() => {
    if (currentUser.isAdmin) {
      getPosts({ term: "sortDirection", value: "desc" });
      getAllComments();
    }
  }, [currentUser]);
  useEffect(() => {
    if (isUsersSuccess && isPostsSuccess && isCommentsSuccess) {
      setLastMonthUsers(users.totalUsersLastMonth);
      setLastMonthPosts(posts.totalPostsMonthAgo);
      setLastMonthComments(comments.totalCommentsMonthAgo);
      setTotalUsers(users.totalUsers);
      setUsersData(users.users);
      setTotalPosts(posts.totalPosts);
      setPostsData(posts.posts);
      setTotalComments(comments.totalComments);
      setCommentsData(comments.comments);
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, isUsersSuccess, isPostsSuccess, isCommentsSuccess]);
  return (
    <div className="px-3">
      {isPostsSuccess && isUsersSuccess && isCommentsSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-[#5C4755]/40 rounded-md">
            <div className="flex gap-4 mb-2 flex-wrap justify-between">
              <div>
                <h4 className="uppercase  font-semibold text-xl">
                  Total users
                </h4>
                <span className="text-lg text-gray-300">{totalUsers}</span>
              </div>
              <div className="h-[60px] w-[60px] rounded-full bg-green-600 flex items-center justify-center">
                <FaUsers size={26} />
              </div>
            </div>
            <div className="flex items-center">
              <FaLongArrowAltUp size={18} className="text-blue-500" />
              <span>
                {lastMothUsers}{" "}
                <span className="text-sm text-gray-400">Last Month</span>
              </span>
            </div>
          </div>
          <div className="p-4 bg-[#5C4755]/40 rounded-md">
            <div className="flex gap-4 mb-2 flex-wrap justify-between">
              <div>
                <h4 className="uppercase  font-semibold text-xl">
                  Total Posts
                </h4>
                <span className="text-lg text-gray-300">{totalPosts}</span>
              </div>
              <div className="h-[60px] w-[60px] rounded-full bg-cyan-600 flex items-center justify-center">
                <BsFillFileEarmarkPostFill size={26} />
              </div>
            </div>
            <div className="flex items-center">
              <FaLongArrowAltUp size={18} className="text-blue-500" />
              <span>
                {lastMonthPosts}{" "}
                <span className="text-sm text-gray-400">Last Month</span>
              </span>
            </div>
          </div>
          <div className="p-4 bg-[#5C4755]/40 rounded-md">
            <div className="flex gap-4 mb-2 flex-wrap justify-between">
              <div>
                <h4 className="uppercase  font-semibold text-xl">
                  Total Comments
                </h4>
                <span className="text-lg text-gray-300">{totalComments}</span>
              </div>
              <div className="h-[60px] w-[60px] rounded-full bg-violet-600 flex items-center justify-center">
                <FaCommentDots size={26} />
              </div>
            </div>
            <div className="flex items-center">
              <FaLongArrowAltUp size={18} className="text-blue-500" />
              <span>
                {lastMonthComments}{" "}
                <span className="text-sm text-gray-400">Last Month</span>
              </span>
            </div>
          </div>
        </div>
      )}
      {(isPostsLoading || isCommentsLoading || isUsersLoading) && <Loader />}
      {/* Recent tables */}
      {isPostsSuccess && isUsersSuccess && isCommentsSuccess && (
        <div className="my-8 flex gap-6 flex-wrap justify-center">
          <div className="relative my-6 w-1/2   bg-[#5C4755]/40 rounded-md overflow-x-auto">
            <div className="p-3 flex ietms-center gap-4 justify-between">
              <p className="text-lg ">Recent Users</p>
              <Link to={"/dashboard?tab=users"} className="main-btn">
                Read More
              </Link>
            </div>
            <table className="text-sm  w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm  text-white uppercase bg-[#5C4755]/40">
                <tr>
                  <th scope="col" className="px-6 text-center py-3 w-1/2">
                    User Avatar
                  </th>
                  <th scope="col" className="px-6 py-3 text-center w-1/2">
                    Username
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
                      <Link to={`/profile/${user._id}`}>
                        <img
                          src={user.imgProfile}
                          alt="img-profile"
                          className="w-10 h-10 rounded-full mx-auto object-cover"
                        />
                      </Link>
                    </th>
                    <td className="px-6 text-center hover:text-main transition capitalize font-semibold">
                      <Link to={`/profile/${user._id}`}>{user.username}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="relative my-6 w-1/2 flex-1   bg-[#5C4755]/40 rounded-md overflow-x-auto">
            <div className="p-3 flex ietms-center gap-4 justify-between">
              <p className="text-lg ">Recent Posts</p>
              <Link to={"/dashboard?tab=posts"} className="main-btn">
                Read More
              </Link>
            </div>
            <table className="text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm  text-white uppercase bg-[#5C4755]/40">
                <tr>
                  <th scope="col" className="px-6 text-center py-3 w-1/2">
                    Post
                  </th>
                  <th scope="col" className="px-6 py-3 text-center w-1/2">
                    Date
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
                      <Link to={`/posts/${post._id}`}>
                        <img
                          src={post.image}
                          alt="img-profile"
                          className="w-10 h-10 rounded-full mx-auto object-cover"
                        />
                      </Link>
                    </th>
                    <td className="px-6 text-center hover:text-main transition capitalize font-semibold">
                      {formatDate(post.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="relative my-6 w-1/2   bg-[#5C4755]/40 rounded-md overflow-x-auto">
            <div className="p-3 flex ietms-center gap-4 justify-between">
              <p className="text-lg ">Recent Comments</p>
              <Link to={"/dashboard?tab=comments"} className="main-btn">
                Read More
              </Link>
            </div>
            <table className="text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm  text-white uppercase bg-[#5C4755]/40">
                <tr>
                  <th scope="col" className="px-6 text-center py-3 w-1/2">
                    Comment
                  </th>
                  <th scope="col" className="px-6 py-3 text-center w-1/2">
                    Likes
                  </th>
                </tr>
              </thead>
              <tbody>
                {commentsData.map((comment) => (
                  <tr
                    key={comment._id}
                    className="odd:bg-[#150B14]  even:bg-[#261C28] even:border-[#261C28] border-b odd:border-[#150B14] "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 text-sm  h-[73px] whitespace-nowrap text-gray-300"
                    >
                      <Link to={`/posts/${comment.postId}`}>
                        {comment.content.slice(0, 30)}...
                      </Link>
                    </th>
                    <td className="px-6 text-center h-[73px] hover:text-main transition capitalize font-semibold">
                      {comment.numberOfLiked}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
