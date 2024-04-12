import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiUser } from "react-icons/hi";
import { FaUserCog, FaUsers } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { BsFileEarmarkPost } from "react-icons/bs";
import { LogOut } from ".";
import {
  MdAdminPanelSettings,
  MdCreateNewFolder,
  MdSpaceDashboard,
} from "react-icons/md";

const Sidebar = ({ tab }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="dashboard-sidebar flex-col static top-[80px]">
      <ul className="flex flex-wrap flex-row gap-3 justify-center  md:flex-col md:justify-start">
        <li>
          <Link
            to={"/dashboard?tab=profile"}
            className={`sidebar-link mb-0 ${
              tab === "profile" && "text-main bg-[#261C28]"
            }`}
          >
            <div className="flex items-center gap-2">
              {currentUser?.isAdmin ? (
                <MdAdminPanelSettings size={26} />
              ) : (
                <HiUser size={26} />
              )}

              <span className="hidden md:inline">Profile</span>
            </div>
            <span className=" bg-slate-900 hidden md:inline px-3 py-1 rounded-md">
              {currentUser?.isAdmin ? "Admin" : "User"}
            </span>
          </Link>
        </li>
        {currentUser.isAdmin && (
          <li>
            <Link
              to={"/dashboard?tab=dashboard"}
              className={`sidebar-link mb-0 ${
                tab === "dashboard" && "text-main bg-[#261C28]"
              }`}
            >
              <div className="flex items-center gap-2">
                <MdSpaceDashboard size={24} />
                <span className="hidden md:inline">Dashboard</span>
              </div>
            </Link>
          </li>
        )}
        <li>
          <Link
            to={"/dashboard?tab=profile-update"}
            className={`sidebar-link mb-0 ${
              tab === "profile-update" && "text-main bg-[#261C28]"
            }`}
          >
            <div className="flex items-center gap-2">
              <FaUserCog size={24} />
              <span className="hidden md:inline">Update Profile</span>
            </div>
          </Link>
        </li>
        {currentUser.isAdmin && (
          <div className="flex flex-row gap-3 justify-center md:flex-col md:justify-start">
            <li>
              <Link
                to={"/dashboard?tab=users"}
                className={`sidebar-link mb-0 ${
                  tab === "users" && "text-main bg-[#261C28]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaUsers size={24} />
                  <span className="hidden md:inline">Users</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard?tab=comments"}
                className={`sidebar-link mb-0 ${
                  tab === "comments" && "text-main bg-[#261C28]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaCommentDots size={24} />
                  <span className="hidden md:inline">Comments</span>
                </div>
              </Link>
            </li>
          </div>
        )}
        <li>
          <Link
            to={"/dashboard?tab=posts"}
            className={`sidebar-link mb-0 ${
              tab === "posts" && "text-main bg-[#261C28]"
            }`}
          >
            <div className="flex items-center gap-2">
              <BsFileEarmarkPost size={24} />
              <span className="hidden md:inline">Your Posts</span>
            </div>
          </Link>
        </li>
        <li>
          <NavLink to={"/create-post"} className="sidebar-link mb-0">
            <div className="flex items-center gap-2">
              <MdCreateNewFolder size={24} />
              <span className="hidden md:inline">Create New Post</span>
            </div>
          </NavLink>
        </li>
      </ul>
      <LogOut />
    </div>
  );
};

export default Sidebar;
