import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaGithub, FaSquareInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-glass">
      <div className="container mx-auto p-4 pt-8 lg:px-0">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to={"/"} className="text-4xl font-bold uppercase text-main">
              blog
            </Link>
            <p className="my-4 text-sm text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              laudantium accusantium nisi maiores inventore temporibus sed
              obcaecati dolorem.
            </p>
          </div>
          <div>
            <h3 className="text-2xl uppercase font-bold my-4">Links</h3>
            <ul className="flex flex-col gap-3 text-lg">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="text-gray-300 hover:text-main transition"
                >
                  <Link to={link.router}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl uppercase font-bold my-4">Legal Links</h3>
            <a
              href="#"
              className="text-lg block text-gray-300 hover:text-main transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-lg block text-gray-300 hover:text-main transition"
            >
              Terms & Coniditions
            </a>
          </div>
          <div>
            <h3 className="text-2xl uppercase font-bold my-4">Follow Us</h3>
            <a
              href="#"
              className="text-lg block text-gray-300 hover:text-main transition"
            >
              Github
            </a>
            <a
              href="#"
              className="text-lg block text-gray-300 hover:text-main transition"
            >
              Discord
            </a>
          </div>
        </div>
        <div>
          <p className="flex items-center gap-1 justify-center border-t border-gray-400 mt-12 pt-4">
            <sapn>2024 &copy;</sapn>
            <Link to={"/"} className="text-xl font-bold uppercase text-main">
              blog
            </Link>
          </p>
          <div className="flex justify-center flex-wrap gap-4 items-center mt-4">
            <a href="#" className="hover:text-main transition">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-main transition">
              <FaGithub size={24} />
            </a>
            <a href="#" className="hover:text-main transition">
              <FaSquareInstagram size={24} />
            </a>
            <a href="#" className="hover:text-main transition">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
