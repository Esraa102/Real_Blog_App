import { FaGoogle } from "react-icons/fa";

const OAuthGoogle = () => {
  return (
    <button
      type="button"
      className="main-btn border-blue-700 flex items-center gap-1 justify-center hover:border-blue-900 hover:text-white hover:bg-blue-900 bg-blue-700 flex-1"
    >
      <FaGoogle size={26} /> <span>Continue With Google</span>
    </button>
  );
};

export default OAuthGoogle;
