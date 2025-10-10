import MovieCard from "./MovieCard";
import AutoScrollRow from "./AutoScrollRow";

export default function MovieRow({ title, movies }) {
  if (!movies.length) return null;

  return (
    <div className="mb-6">
      <h2 className="text-white font-semibold text-lg mb-2">{title}</h2>
      <AutoScrollRow>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </AutoScrollRow>
    </div>
  );
}
