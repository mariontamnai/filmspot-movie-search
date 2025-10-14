import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieVideos } from "../services/movieApi";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);

      const videos = await fetchMovieVideos(id);
      const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    };
    loadMovie();
  }, [id]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();

  }, [id]);

  if (!movie) {
    return <p>Loading movie details...</p>
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      )}
    {trailerKey && (
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">Trailer</h2>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Movie Trailer"
          allowFullScreen
        ></iframe>
      </div>
    )}
    </div>
  );
}
