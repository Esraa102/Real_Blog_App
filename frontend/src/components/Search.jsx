import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Search = ({ searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = searchTerm.toString();
    navigate(`/search?searchTerm=${searchQuery}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-[130px]  lg:min-w-[300px] items-center gap-3 px-4 py-3 bg-[#5C4755]/30 rounded-md"
    >
      <input
        type="search"
        placeholder="Search..."
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
        className="input w-full lg:flex-1"
      />
      <button type="submit" className="hover:text-main transition font-bold">
        <IoSearch size={24} />
      </button>
    </form>
  );
};

export default Search;
