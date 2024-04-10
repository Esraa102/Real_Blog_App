import { Link } from "react-router-dom";

const PostCard = ({ id, title, image, category, content }) => {
  return (
    <div className="p-3 relative flex flex-col gap-4 justify-between bg-[#261C28]/40 rounded-md overflow-hidden hover:scale-105 transition">
      <img
        src={image}
        alt="post-img"
        className="h-[180px] w-full object-cover rounded-md"
      />
      <p className="px-2 text-xl font-semibold text-main">
        {title.length < 20 ? title : `${title.slice(0, 20)}...`}
      </p>
      <p className="text-gray-300 px-2">
        {content.length < 200 ? content : `${content.slice(0, 200)}...`}
      </p>
      <p
        className="secondary-btn text-sm mx-0 px-2 capitalize
      absolute top-6 right-6"
      >
        {category}
      </p>
      <Link to={`/posts/${id}`} className="block main-btn text-center">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
