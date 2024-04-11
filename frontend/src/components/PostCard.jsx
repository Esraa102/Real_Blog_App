import { Link } from "react-router-dom";

const PostCard = ({
  id,
  title,
  image,
  category,
  content,
  author,
  showAuthor,
}) => {
  return (
    <div className="p-3 relative flex flex-col gap-4 justify-between bg-[#261C28]/40 rounded-md overflow-hidden hover:scale-105 transition">
      <div className="flex flex-col gap-4">
        <img
          src={image}
          alt="post-img"
          className="h-[180px] w-full object-cover rounded-md"
        />
        <p className="px-2 text-xl font-semibold text-main line-clamp-1">
          {title}
        </p>
        <p
          className="text-gray-300 post-content px-2 line-clamp-5"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></p>
      </div>
      <p
        className="secondary-btn text-sm mx-0 px-2 capitalize
      absolute top-6 right-6"
      >
        {category}
      </p>
      <div className="flex items-center gap-4 flex-wrap mb-4 justify-between">
        {showAuthor && (
          <div className="flex items-center gap-2">
            <Link to={`/profile/${author.userId}`}>
              <img
                src={author.profileImg}
                alt="img-profile"
                className="w-14 h-14 rounded-full object-cover"
              />
            </Link>
            <p className="text-sm text-gray-400 lowercase font-semibold">
              @{author.username}
            </p>
          </div>
        )}

        <Link to={`/posts/${id}`} className="main-btn text-center">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
