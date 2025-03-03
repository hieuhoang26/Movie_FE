import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleVideoTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setTrailerUrl(data.results[0]?.key);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <div className="flex gap-10">
        <img
          src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-64 h-auto rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">{movie.overview}</p>
          <p className="mt-2">⭐ {movie.vote_average?.toFixed(1)}</p>
          <button
            onClick={handleVideoTrailer}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Xem Trailer
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Trailer Modal"
      >
        {trailerUrl && (
          <div className="flex items-center justify-center mt-5">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MovieDetail;
