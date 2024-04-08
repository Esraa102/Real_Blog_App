import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Posts = () => {
  return (
    <div>
      <h2 className="mt-6 mb-1 text-3xl font-bold text-main">All Posts</h2>
      <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-white uppercase bg-[#5C4755]/40">
            <tr>
              <th scope="col" className="px-6 py-3 w-[30%]">
                Post Title
              </th>
              <th scope="col" className="px-6 py-3 w-[40%]">
                Image
              </th>
              <th scope="col" className="px-6 py-3 w-[10%]">
                Category
              </th>
              <th scope="col" className="px-6 py-3 w-[20%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-[#150B14]  even:bg-[#261C28] even:border-[#261C28] border-b odd:border-[#150B14] ">
              <th
                scope="row"
                className="px-6 hover:text-main transition font-semibold py-4 text-lg whitespace-nowrap text-white"
              >
                <Link to={"/posts/:slug"}>Post Title</Link>
              </th>
              <td className="py-4">
                <img
                  src="/assets/bg.jpg"
                  alt=""
                  className="w-[150px] h-[90px] rounded-md"
                />
              </td>
              <td className="px-6 py-4">Education</td>
              <td className="px-6 py-4 h-[122px] flex items-center gap-3">
                <Link
                  to={"/posts/update/:id"}
                  className="hover:text-main transition text-white"
                >
                  <FaEdit size={26} />
                </Link>
                <button
                  type="button"
                  className="text-[#f00] hover:text-red-700 transition"
                >
                  <RiDeleteBin5Fill size={26} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
