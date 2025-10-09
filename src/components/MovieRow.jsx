import MovieCard from "./MovieCard";
import { useEffect, useRef } from "react";

export default function MovieRow({ title, movies}) {
    const rowRef = useRef();

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;

        let scrollAmount = 0;
        const speed = 0.5;
        const interval = setInterval(() => {
            if (row.scrollWidth - row.scrollLeft <= row.clientWidth) {
                row.scrollLeft = 0;
            } else {
                row.scrollLeft += speed;
            }
        }, 16);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="mb-6">
            <h2 className="text-white font-semibold text-lg mb-2">{title}</h2>
            <div ref={rowRef} className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}