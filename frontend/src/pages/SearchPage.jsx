/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categories } from "../constants";
import { useSearchPostMutation } from "../features/posts/api/postsApiSlice";
import toast from "react-hot-toast";
import { Loader, PostCard, ShowMoreResult } from "../components";

const SearchPage = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const [searchPosts, { data, isError, error, isSuccess, isLoading }] =
    useSearchPostMutation();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSidebarData({ ...sidebarData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sidebarData);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort ? sidebarData.sort : "desc");
    urlParams.set(
      "category",
      sidebarData.category ? sidebarData.category : "uncategorized"
    );
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    navigate(`/search?${searchQuery}`);
  };
  console.log(showMore);
  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const searchTerm = url.get("searchTerm");
    const searhSortFromUrl = url.get("sort");
    const categoryFromUrl = url.get("category");
    if (searchTerm || searhSortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm,
        sort: searhSortFromUrl,
        category: categoryFromUrl,
      });
      const searchQuery = url.toString();
      searchPosts(searchQuery);
    }
  }, [location.search]);
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setPosts(data.posts);
      console.log(data);
    }
  }, [isSuccess, isError]);

  return (
    <section className="container mx-auto text-white p-4 pt-[110px] lg:px-0">
      <div className="flex gap-6">
        <div className="dashboard-sidebar">
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-row justify-between w-full md:flex-col gap-4"
          >
            <div className="field-container">
              <label htmlFor="search" className="label text-[16px]">
                Search Term
              </label>
              <input
                type="text"
                name="searchTerm"
                id="search"
                className="form-input"
                value={sidebarData.searchTerm}
                onChange={handleOnChange}
                placeholder="search...."
              />
            </div>
            <div className="field-container">
              <label htmlFor="order" className="label text-[16px]">
                Order
              </label>
              <select
                name="sort"
                id="order"
                value={sidebarData.sort}
                onChange={handleOnChange}
                className="form-input"
              >
                <option value="desc">Lastest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>
            <div className="field-container">
              <label htmlFor="category" className="label text-[16px]">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={sidebarData.category}
                onChange={handleOnChange}
                className="form-input"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category.toLowerCase()}
                    className="capitalize"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="main-btn">
              Search
            </button>
          </form>
        </div>
        <div className="dashboard-main px-6">
          <h1 className="text-3xl mt-4 font-bold text-main mb-6">
            Found {posts.length} Results
          </h1>
          {isLoading && <Loader />}
          {isSuccess && !isLoading && posts.length === 0 && (
            <p className="text-gray-400 text-center">No Results Found</p>
          )}
          {isSuccess && !isLoading && (
            <div className="grid my-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
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
          {showMore && <ShowMoreResult posts={posts} setPosts={setPosts} />}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
