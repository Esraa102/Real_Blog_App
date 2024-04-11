/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  useGetPostByIdMutation,
  useDeletePostMutation,
} from "../features/posts/api/postsApiSlice";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CallToAction, CommentSection, Loader, Posts } from "../components";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formateDate";

const PostPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [getPostById, { data, isSuccess, isLoading, isError, error }] =
    useGetPostByIdMutation();
  const [
    deletePost,
    {
      data: deletedPost,
      isSuccess: deleteSuccess,
      error: deleteError,
      isLoading: isDeleteing,
    },
  ] = useDeletePostMutation();
  const navigate = useNavigate();
  const handleDeletePost = () => {
    deletePost({ userId: currentUser._id, postId: data.post._id });
    navigate("/dashboard?tab=posts");
  };
  useEffect(() => {
    getPostById(id);
  }, [id]);
  useEffect(() => {
    if (isSuccess) {
      if (data.message) {
        toast.error(data.message);
      } else {
        console.log(data.post);
      }
    }
    if (isError) {
      toast.error(error.error);
    }
  }, [isError, isSuccess]);
  useEffect(() => {
    if (deleteSuccess) {
      if (deletedPost.message) {
        toast.error(deletedPost.message);
      } else {
        toast.success(deletedPost);
      }
    }
    if (deleteError) {
      toast.error(deleteError.data.message);
    }
  }, [deleteSuccess, deleteError, deletedPost]);
  return (
    <section className="container min-h-screen mx-auto text-white p-4 pt-[110px] lg:px-0">
      {isLoading && !data && <Loader />}
      {!isLoading && isSuccess && data && (
        <div className="bg-glass p-6 rounded-md">
          <h1 className="my-6 text-2xl text-main capitalize font-bold text-center">
            {data.post.title}
          </h1>
          <Link
            to={`/search?category=${data.post.category}`}
            className="capitalize block w-fit mx-auto text-center font-semibold text-lg bg-slate-900 my-4 text-main px-4 py-2 rounded-md"
          >
            {data.post.category}
          </Link>
          <img
            src={data.post.image}
            className="w-full h-[350px] object-cover rounded-lg my-6"
            alt="post-img"
          />
          <div className="flex gap-4 flex-wrap items-center justify-between">
            <div className="flex flex-wrap text-gray-400 text-sm gap-3">
              <span>Created At: {formatDate(data.post.createdAt)}</span>
              <span>Updated At: {formatDate(data.post.updatedAt)}</span>
            </div>
            <p className=" mt-2 text-main font-semibold">
              [ {Math.ceil(data.post.content.length / 1000)} ] Mins Read
            </p>
          </div>
          <div
            className="my-6 post-content"
            dangerouslySetInnerHTML={{ __html: data.post.content }}
          ></div>
          <div className="max-w-4xl my-14 mx-auto w-full">
            <CallToAction />
          </div>
          <div>
            <CommentSection postId={data.post._id} />
          </div>
          <div className="mt-6 flex flex-wrap gap-6 items-center">
            {currentUser?._id === data.post.author.userId && (
              <Link to={`/update-post/${data.post._id}`} className="main-btn">
                Update Post
              </Link>
            )}
            {currentUser?.isAdmin ||
              (currentUser?._id === data.post.author.userId && (
                <button
                  type="button"
                  onClick={handleDeletePost}
                  className={`main-btn block bg-red-600 border-red-600 hover:text-white hover:bg-red-800 hover:border-red-800 ${
                    isDeleteing && "load-btn"
                  } `}
                >
                  Delete Post
                </button>
              ))}
          </div>
          <div className="mt-14">
            <h3 className="text-center text-main text-3xl font-bold my-8">
              Recent Articles
            </h3>
            <Posts term={"limit"} value={3} showAuthor={true} />
          </div>
        </div>
      )}
    </section>
  );
};

export default PostPage;
