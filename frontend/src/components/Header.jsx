import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../constants";
import { Search, LogOut } from ".";
import { useSelector } from "react-redux";
import { FaBarsProgress } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [closedNav, setClosedNav] = useState(true);
  return (
    <header>
      <div className="fixed w-full top-0 left-0 z-10 bg-glass">
        <div className="container mx-auto p-4 lg:px-0 flex items-center justify-between gap-6">
          <Link to={"/"} className="text-2xl font-bold uppercase text-main">
            blog
          </Link>
          <Search />
          <div className="lg:flex items-center gap-4 hidden">
            <ul className="flex items-center gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.router}
                    className={({ isActive }) =>
                      `text-lg font-semibold hover:text-main ${
                        isActive && "text-main font-bold"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            {currentUser ? (
              <LogOut />
            ) : (
              <Link to={"/sign-in"} className={"main-btn"}>
                Sign In
              </Link>
            )}
            {currentUser && (
              <Link to={"/dashboard?tab=profile"}>
                <img
                  src={currentUser.imgProfile}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </Link>
            )}
          </div>
          <div className="block lg:hidden relative z-10">
            <button
              type="button"
              className="hover:text-main transition"
              onClick={() => setClosedNav((prev) => !prev)}
            >
              {closedNav ? (
                <FaBarsProgress size={24} />
              ) : (
                <IoMdCloseCircle size={28} />
              )}
            </button>
          </div>
        </div>
      </div>
      {!closedNav && (
        <div className="fixed top-[85px] bg-gray-600/10 bg-glass backdrop-blur-md right-2  p-4 rounded-md z-10 w-[45%]">
          <ul className="flex flex-col gap-4 mb-4">
            {navLinks.map((link) => (
              <li key={link.name} onClick={() => setClosedNav(true)}>
                <NavLink
                  to={link.router}
                  className={({ isActive }) =>
                    `text-lg font-semibold hover:text-main ${
                      isActive && "text-main font-bold"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {currentUser && (
            <Link to={"/dashboard?tab=profile"}>
              <img
                src={currentUser.imgProfile}
                className="w-14 h-14 my-4 rounded-full object-cover"
              />
            </Link>
          )}
          {currentUser ? (
            <LogOut />
          ) : (
            <Link to={"/sign-in"} className={"main-btn block w-full"}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
