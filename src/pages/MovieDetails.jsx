import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieVideos } from "../services/movieApi";
import TrailerModal from "../TrailerModal";

 function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);

        const videoData = await fetchMovieVideos(id);
        const trailerData = videoData?.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailerData) {
          setTrailerKey(trailerData.key);
        }
      } catch (error) {
        console.error("Error loading movie details:", error);
      }
    };

    loadMovie();
  }, [id]);

  if (!movie) {
    return <p className="text-white p-4">Loading movie details...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="relative w-full h-[60vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="px-6 -mt-32 relative z-10">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="text-sm text-gray-300 mb-4">
          ⭐ {movie.vote_average} | {movie.release_date?.slice(0, 4)} |{" "}
          {movie.genres?.map((g) => g.name).join(", ")}
        </p>
        <p className="max-w-2xl text-gray-200 mb-6">{movie.overview}</p>

        <div className="flex items-center gap-4">
          {trailerKey && (
            <>
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-red-600 px-6 py-3 font-semibold rounded hover:bg-red-700 transition"
              >
                ▶ Watch Trailer
              </button>
              {showTrailer && (
                <TrailerModal
                  trailerKey={trailerKey}
                  onClose={() => setShowTrailer(false)}
                />
              )}
            </>
          )}

          <button className="bg-gray-700 px-6 py-3 rounded hover:bg-gray-800">
            + Add to List
          </button>
        </div>
      </div>
    </div>
  );
}
export default MovieDetails;
