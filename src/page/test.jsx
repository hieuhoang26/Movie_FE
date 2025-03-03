import React, { useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaClock,
  FaImdb,
  FaTheaterMasks,
  FaCalendarAlt,
  FaGlobe,
} from "react-icons/fa";

const MovieDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const movieData = {
    title: "SILO",
    year: "2023",
    rating: 8.5,
    duration: "2h 15m",
    genres: ["Sci-Fi", "Drama", "Thriller"],
    synopsis:
      "In a ruined future, thousands live in a giant silo deep underground. After the sheriff breaks a cardinal rule and residents die mysteriously, engineer Juliette starts to uncover shocking secrets and the truth about the silo.",
    director: "Graham Yost",
    language: "English",
    releaseDate: "May 5, 2023",
    production: "AMC Studios",
    cast: [
      {
        name: "Rebecca Ferguson",
        role: "Juliette",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      {
        name: "Common",
        role: "Robert",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
      {
        name: "Tim Robbins",
        role: "Bernard",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
    ],
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-orange-500" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-orange-500" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1"
              alt="Silo Movie Poster"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1485846234645-a62644f84728";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                {movieData.title}
              </h1>
              <p className="text-xl text-gray-400">{movieData.year}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {movieData.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-4 py-1 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                {renderStars(movieData.rating)}
                <span className="ml-2 text-white">{movieData.rating}/10</span>
              </div>
              <div className="flex items-center text-white">
                <FaClock className="mr-2" />
                {movieData.duration}
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {movieData.synopsis}
            </p>

            <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-lg">
              <div className="flex items-center space-x-2 text-gray-300">
                <FaTheaterMasks />
                <span>Director: {movieData.director}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaCalendarAlt />
                <span>Release: {movieData.releaseDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaGlobe />
                <span>Language: {movieData.language}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaImdb />
                <span>Production: {movieData.production}</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {movieData.cast.map((actor) => (
                  <div
                    key={actor.name}
                    className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
                  >
                    <p className="text-white font-medium">{actor.name}</p>
                    <p className="text-gray-400 text-sm">{actor.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
