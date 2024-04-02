import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <form className="flex min-w-[300px] items-center gap-3 px-4 py-3 bg-[#5C4755]/30 rounded-md">
      <input
        type="search"
        placeholder="Search..."
        name="search"
        required
        className="input flex-1"
      />
      <button type="submit" className="hover:text-main transition font-bold">
        <IoSearch size={24} />
      </button>
    </form>
  );
};

export default Search;
