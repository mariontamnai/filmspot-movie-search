import React, { useEffect, useState } from "react";
import {
  fetchTrendingMovies,
  fetchMoviesByCategory,
  fetchGenres,
  fetchMovies,
} from "../services/movieApi";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import MovieRow from "../components/MovieRow";
import GenreRow from "../components/GenreRow";
import { Link } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <header className="p-4 flex justify-between items-center">
        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
        <Link
          to="/auth"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login / Signup
          </Link>
      </header>

      <main className="p-4 space-y-8">
        {loading && <p>Loading...</p>}

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

        {!query && trendingMovies.length > 0 && (
          <MovieRow title="Trending Now" movies={trendingMovies} />
        )}

        {!query && topRated.length > 0 && (
          <MovieRow title="Top Rated" movies={topRated} />
        )}

        {!query &&
          genres.map((genre) => (
            <GenreRow key={genre.id} genre={genre} />
          ))}
      </main>
    </div>
  );
}

export default Home;
