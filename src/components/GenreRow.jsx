import { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";
import { fetchMoviesByGenre } from "../services/movieApi";

export default function GenreRow({ genre }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef();

  useEffect(() => {
    const loadGenreMovies = async () => {
      const data = await fetchMoviesByGenre(genre.id);
      setMovies(data);
    };
    loadGenreMovies();
  }, [genre.id]);

  // Auto-scroll (optional, you can reuse the previous auto-scroll logic here)
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const speed = 1;
    const interval = setInterval(() => {
      if (row.scrollWidth - row.scrollLeft <= row.clientWidth) {
        row.scrollLeft = 0;
      } else {
        row.scrollLeft += speed;
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  if (!movies.length) return null;

  return (
    <div className="mb-6">
      <h2 className="text-white font-semibold text-lg mb-2">{genre.name}</h2>
      <div
        ref={rowRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
