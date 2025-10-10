import MovieCard from "./MovieCard";
import AutoScrollRow from "./AutoScrollRow";
import { useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../services/movieApi";

export default function GenreRow({ genre }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadGenreMovies = async () => {
      const data = await fetchMoviesByGenre(genre.id);
      setMovies(data);
    };
    loadGenreMovies();
  }, [genre.id]);

  if (!movies.length) return null;

  return (
    <div className="mb-6">
      <h2 className="text-white font-semibold text-lg mb-2">{genre.name}</h2>
      <AutoScrollRow>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </AutoScrollRow>
    </div>
  );
}
