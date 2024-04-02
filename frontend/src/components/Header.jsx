import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../constants";
import { Search, LogOut } from ".";

const Header = () => {
  const user = null;
  return (
    <header className="fixed w-full top-0 left-0 z-10 bg-glass">
      <div className="container mx-auto p-4 lg:px-0 flex items-center justify-between">
        <Link to={"/"} className="text-2xl font-bold uppercase">
          blog
        </Link>
        <Search />
        <div className="flex items-center gap-4">
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
          {user ? (
            <Link to={"/sign-in"} className={"main-btn"}>
              Sign In
            </Link>
          ) : (
            <LogOut />
          )}
          {user && (
            <Link to={"/profile"}>
              <img
                src="/assets/bg.jpg"
                className="w-14 h-14 rounded-full object-cover"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
