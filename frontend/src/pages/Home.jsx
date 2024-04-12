/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CallToAction } from "../components";
import { useGetPostsMutation } from "../features/posts/api/postsApiSlice";
import toast from "react-hot-toast";
import { PostCard, Loader } from "../components";
const Home = () => {
  const [getPosts, { data, isError, isSuccess, isLoading, error }] =
    useGetPostsMutation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts({ term: "limit", value: 9 });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      if (data?.message) {
        toast.error(data?.message);
      } else {
        setPosts(data?.posts);
      }
    }
    if (isError) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, isError]);
  return (
    <section className="container mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="bg-glass p-6 rounded-md">
        <div className="flex gap-4 flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl my-6 font-semibold">
              Welcome to my <span className="text-main font-bold">Blog</span>
            </h1>
            <p className="mt-4 text-gray-400 my-6">
              Here you&apos;ll find a variety of articles and tutorials on
              topics such as programming, fashion,education and more!
            </p>
            <Link to={"/search"} className="main-btn">
              View All Posts
            </Link>
          </div>
          <img
            src="/assets/bg.jpg"
            className="w-full md:w-1/2 rounded-lg"
            alt="home-img"
          />
        </div>
        <div className="mt-40 mb-20 w-full mx-auto max-w-4xl">
          <CallToAction />
        </div>
        <div>
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-bold text-main">
            Recent Posts
          </h2>
          {isLoading && <Loader />}
          {!isLoading && isSuccess && (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  content={post.content}
                  image={post.image}
                  category={post.category}
                  author={post.author}
                  showAuthor={true}
                />
              ))}
            </div>
          )}
        </div>
        <Link
          to={"/search"}
          className="hover:underline mb-6 mt-8 block hover:text-main text-center text-lg font-semibold"
        >
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
