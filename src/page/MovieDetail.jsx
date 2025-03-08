import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import http from "../api/http"; // Import http từ api/http.js
import {
  FaTheaterMasks,
  FaCalendarAlt,
} from "react-icons/fa";

const comments = [
  {
    id: 1,
    name: "Arlene",
    date: "12/06/2020",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 10,
  },
  {
    id: 2,
    name: "Arlene",
    date: "12/06/2020",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 10,
  },
];


const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await http.get(`user/movie/${id}`);
        setMovie(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phim:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="h-full bg-black text-white min-h-screen pb-10 relative">
      {/* Hiển thị video */}
      <div className="px-5 flex justify-center">
        {movie.movie && (
          <div className="mb-6 w-full max-w-5xl">
            <ReactPlayer url={movie.movie} controls width="100%" height="500px" />
          </div>
        )}
      </div>

      {/* Thông tin chi tiết phim */}
      <div className="max-w-7xl mx-auto my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Movie Poster */}
          <div className="relative group overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.02] flex justify-center">
            <img
              src={movie.pictureURL}
              alt={movie.title}
              className="w-xl h-auto max-h-[400px] object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500x750?text=No+Image";
              }}
            />
          </div>

          {/* Movie Details */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white mb-2">{movie.title}</h1>
            <p className="text-xl text-gray-400">{movie.year}</p>

            <div className="flex flex-wrap gap-2">
              {movie.categories?.map((category) => (
                <span key={category.id} className="px-4 py-1 bg-white/10 text-white rounded-full">
                  {category.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">{movie.description}</p>

            <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-300">
                <FaTheaterMasks />
                <span>Author: {movie.author}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaCalendarAlt />
                <span>Release: {movie.year}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto my-8 text-2xl font-bold ">
        <span>You may so like </span>
      </div>

      <div className="max-w-4xl mx-auto bg-black text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {/* Input box */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://randomuser.me/api/portraits/men/15.jpg"
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <input
            type="text"
            placeholder="Write your comments here....."
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
          />
        </div>

        {/* Comments list */}
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 mb-6">
            <img
              src={comment.avatar}
              alt={comment.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{comment.name}</p>
              <p className="text-gray-400 text-sm">{comment.date}</p>
              <p className="mt-1">{comment.text}</p>
              <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                {/* <button className="flex items-center gap-1 hover:text-gray-200">
                  👍 {comment.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-gray-200">
                  👎
                </button> */}
                <button className="hover:text-gray-200 px-7">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MovieDetail;
