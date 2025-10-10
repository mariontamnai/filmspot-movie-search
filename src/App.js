import React, { useEffect, useState } from "react";
import "./App.css";
import {
  fetchTrendingMovies,
  fetchMoviesByCategory,
  fetchGenres,
  fetchMoviesByGenre,
  fetchMovies,
} from "./services/movieApi";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieRow from "./components/MovieRow";
import GenreRow from "./components/GenreRow";

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load trending, top rated, and genres on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const trending = await fetchTrendingMovies();
      setTrendingMovies(trending);

      const top = await fetchMoviesByCategory("top_rated");
      setTopRated(top);

      const genreList = await fetchGenres();
      setGenres(genreList);

      setLoading(false);
    };
    loadData();
  }, []);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const results = await fetchMovies(query);
    setSearchResults(results);
    setLoading(false);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <header className="p-4 flex justify-center">
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
      </header>

      <main className="p-4 space-y-8">
        {loading && <p>Loading...</p>}

        {/* Search Results Grid */}
        {query && searchResults.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Trending Row */}
        {!query && trendingMovies.length > 0 && (
          <MovieRow title="Trending Now" movies={trendingMovies} />
        )}

        {/* Top Rated Row */}
        {!query && topRated.length > 0 && (
          <MovieRow title="Top Rated" movies={topRated} />
        )}

        {/* Genre Rows */}
        {!query &&
          genres.map((genre) => (
            <GenreRow key={genre.id} genre={genre} />
          ))}
      </main>
    </div>
  );
}

export default App;
