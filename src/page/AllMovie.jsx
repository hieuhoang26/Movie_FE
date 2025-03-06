import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import SortDropdown from "../components/SortDropdown";
import { FaFilter } from "react-icons/fa";

const AllMovie = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const fetchMovies = async (url) => {
        return await fetch(url, options).then((response) => response.json());
      };

      try {
        const response = await Promise.all(urls.map(fetchMovies));

        setTrendingMovies(response[0].results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white  pb-10 pt-20">
      <div className="my-10 px-10 max-w-full ">
        <h2 className="text-xl uppercase mb-4 mt-10">ALL MOVIE</h2>
        <div className="flex items-center space-x-4">
          <SortDropdown />
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 focus:ring focus:ring-gray-500"
          >
            <FaFilter />
          </button>
        </div>
        {/* Hiển thị Filter khi isFilterVisible === true */}
        {isFilterVisible && <Filter />}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  mt-6">
          {trendingMovies.map((item) => (
            <div
              key={item.id}
              className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${
                  item.poster_path
                })`,
              }}
              // onClick={() => handleVideoTrailer(item.id)}
            >
              <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
              <div className="relative  p-4 flex flex-col items-center justify-end h-full">
                <h3 className="text-md uppercase">
                  {item.name || item.title || item.original_title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovie;
