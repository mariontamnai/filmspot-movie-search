import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies}) {
    return (
        <div className="mb-6">
            <h2 className="text-white font-semibold text-lg mb-2">{title}</h2>
            <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}