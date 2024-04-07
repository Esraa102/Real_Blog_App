import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { FaUserCog } from "react-icons/fa";
import { LogOut } from ".";
import { useSelector } from "react-redux";

const Sidebar = ({ tab }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="dashboard-sidebar">
      <ul className="flex flex-row gap-4 justify-between md:flex-col md:justify-start">
        <li>
          <Link
            to={"/dashboard?tab=profile"}
            className={`sidebar-link mb-0 ${
              tab === "profile" && "text-main bg-[#261C28]"
            }`}
          >
            <div className="flex items-center gap-2">
              <HiUser size={26} />
              <span className="hidden md:inline">Profile</span>
            </div>
            <span className=" bg-slate-900 px-3 py-1 rounded-md">
              {currentUser?.isAdmin ? "Admin" : "User"}
            </span>
          </Link>
        </li>
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
      </ul>
      <LogOut />
    </div>
  );
};

export default Sidebar;
