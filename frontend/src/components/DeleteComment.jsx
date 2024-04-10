import { MdDeleteForever } from "react-icons/md";

const DeleteComment = () => {
  return (
    <button className="text-gray-400 hover:text-red-700 transition">
      <MdDeleteForever size={20} />
    </button>
  );
};

export default DeleteComment;
