/* eslint-disable react/prop-types */
export default function MovieCard({ movie }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer w-36 sm:w-44 md:w-48 flex-shrink-0">
      <img
        src={
          movie.poster_path
            ? imageBaseUrl + movie.poster_path
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-3">
        <h3 className="text-white font-semibold text-lg truncate">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}
