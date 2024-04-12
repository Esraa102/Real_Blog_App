import { BsQuestionOctagonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const PageError = () => {
  return (
    <section className="container  mx-auto text-white p-4 pt-[210px] lg:px-0">
      <div className="bg-glass flex flex-col gap-3 items-center justify-center p-6 rounded-md">
        <BsQuestionOctagonFill size={80} className="text-red-600" />
        <span className="text-lg text-gray-400">Oops! Page Not Found</span>
        <Link to={"/"} className="main-btn mt-6">
          Go To Homepage
        </Link>
      </div>
    </section>
  );
};

export default PageError;
