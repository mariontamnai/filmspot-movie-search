/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function MovieCard({ movie }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
  <Link to={`/movie/${movie.id}`} className="block">
  <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transform transition-transform duration-300 cursor-pointer group w-36 sm:w-44 md:w-48 flex-shrink-0 scrollbar-hide">
    <img
      src={
        movie.poster_path
          ? imageBaseUrl + movie.poster_path
          : "https://via.placeholder.com/500x750?text=No+Image"
      }
      alt={movie.title}
      className="w-full h-64 object-cover rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-150"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 rounded-b-lg scrollbar-hide">
      <h3 className="text-white font-semibold text-sm truncate">
        {movie.title}
      </h3>
      <p className="text-yellow-400 text-xm">⭐ {movie.vote_average}</p>
    </div>

    <div className="absolute inset-0 bg-black bg-opacity-90 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-center overflow-hidden ">
      <h3 className="font-semibold text-sm mb-1 truncate">{movie.title}</h3>
      <p className="text-xs mb-1 line-clamp-4">{movie.overview || "No description available."}</p>
      <p className="text-xs text-gray-400">Release: {movie.release_date || "N/A"}</p>
      <p className="text-yellow-400 text-xs mt-1">⭐ {movie.vote_average}</p>
    </div>
  </div>
  </Link>
  );
}
