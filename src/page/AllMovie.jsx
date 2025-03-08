import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Filter from "../components/Filter";
import SortDropdown from "../components/SortDropdown";
import { FaFilter } from "react-icons/fa";
import http from "../api/http"; // Import module http đã xử lý token

const AllMovie = () => {
  const [movies, setMovies] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [page, setPage] = useState(0); // Trang hiện tại
  const [size, setSize] = useState(10); // Số phim trên mỗi trang
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  const navigate = useNavigate(); // Hook điều hướng

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await http.get(`/user/movie?page=${page}&size=${size}`);
        console.log("Dữ liệu API:", response.data);
        setMovies(response.data.data?.content || []);
        setTotalPages(response.data.data?.totalPages || 1); // Lấy tổng số trang từ API

      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchMovies();
  }, [page, size]); // Gọi lại API khi `page` hoặc `size` thay đổi

  // Chuyển hướng đến trang chi tiết phim khi nhấn vào
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-10 pt-20">
      <div className="my-10 px-10 max-w-full">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
              style={{
                backgroundImage: `url(${movie.picture})`,
              }}
              onClick={() => handleMovieClick(movie.id)} // Gọi hàm khi nhấn vào phim
            >
              <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
              <div className="relative p-4 flex flex-col items-center justify-end h-full">
                <h3 className="text-md uppercase">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* PHÂN TRANG */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className={`p-2 px-4 rounded-lg ${page === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"} text-white`}
          >
            Trang trước
          </button>
          <span>Trang {page + 1} / {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1}
            className={`p-2 px-4 rounded-lg ${page >= totalPages - 1 ? "bg-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"} text-white`}
          >
            Trang tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMovie;
