import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  return (
    //   <div className="p-4 flex justify-between  fixed top-0 left-0 w-full z-[9999]  bg-black">
    //     <div className="flex items-center space-x-5">
    //       <input
    //         type="text"
    //         placeholder="Search"
    //         className="border border-gray-300 p-2 text-black"
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //       />
    //       <button
    //         className="bg-red-700 text-white px-3 py-1 rounded-lg"
    //         onClick={() => onSearch(search)}
    //       >
    //         Search
    //       </button>
    //     </div>

    //   </div>
    // );
    <div className="p-4 flex justify-between fixed top-0 left-0 w-full z-[9999] bg-black">
      <div className="flex items-center gap-8">
        <h1 className="text-[30px] uppercase text-red-700 font-bold">Movie</h1>
        <nav className="hidden md:flex items-center space-x-5">
          <a href="#" className="hover:text-red-700">
            Home
          </a>
          <a href="#" className="hover:text-red-700">
            About
          </a>
          <a href="#" className="hover:text-red-700">
            Contact
          </a>
        </nav>
      </div>

      <div className="flex w-full max-w-md rounded bg-white">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" className="p-2" onClick={() => onSearch(search)}>
          <svg className="fill-black h-6 w-6" viewBox="0 0 56.966 56.966">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
      s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
      c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17
      s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </button>
      </div>

      <Link to="/login" className=" text-white px-3 py-1 rounded-lg">
        Login
      </Link>
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
