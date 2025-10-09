import React, { useEffect, useState} from "react";
import "./App.css";
import {  fetchTrendingMovies, fetchMovies } from "./services/movieApi";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieRow from "./components/MovieRow";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      const trending = await fetchTrendingMovies();
      setTrendingMovies(trending);
      setLoading(false);
    };
    loadTrending();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    setLoading(true);
    const data = await fetchMovies(query);
    setMovies(data);
    setLoading(false);
  };

  // (Live Search)
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim() !== "") {
        const searchMovies = async () => {
          setLoading(true);
          const results = await fetchMovies(query);
          setMovies(results);
          setLoading(false);
        };
        searchMovies();
      }
    }, 500); 

    return () => clearTimeout(delaySearch);
  }, [query]);

  return (
  <div className="bg-black min-h-screen text-white">
    <header className="p-4 flex justify-center">
      
      <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
    </header>

    <main className="p-4">
      {loading && <p>Loading...</p>}
      
      {query && movies.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {trendingMovies.length > 0 && !query && (
        <MovieRow title="Trending Movies" movies={trendingMovies} />
      )}

      {!loading && query && movies.length === 0 && (
        <p className="text-gray-400">No Results found for "{query}"</p>
      )}
    </main>
  </div>
);
}
export default App;
