import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { LogOut } from ".";
const Sidebar = ({ tab }) => {
  return (
    <div className="dashboard-sidebar">
      <ul className="flex flex-row gap-4 justify-between md:flex-col md:justify-start">
        <li>
          <Link
            to={"/dashboard?tab=profile"}
            className={`sidebar-link ${
              tab === "profile" && "text-main bg-[#261C28]"
            }`}
          >
            <div className="flex items-center gap-2">
              <HiUser size={26} />
              <sapn>Profile</sapn>
            </div>
            <span className=" bg-slate-900 px-3 py-1 rounded-md">User</span>
          </Link>
        </li>
      </ul>
      <LogOut full />
    </div>
  );
};

export default Sidebar;
