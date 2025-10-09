import React, { useEffect, useState} from "react";
import "./App.css";
import {  fetchTrendingMovies, fetchMovies } from "./services/movieApi";
import SearchBar from "./components/SearchBar";


function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      const trending = await fetchTrendingMovies();
      setMovies(trending);
      setLoading(false);
    };
    loadTrending();
  }, []);

  // Search as user types (Live Search)
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
    }, 500); // delay search to reduce API calls

    return () => clearTimeout(delaySearch);
  }, [query]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎬 FilmSpot</h1>
      <SearchBar value={query} onChange={setQuery} />

      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.release_date?.slice(0, 4) || "N/A"})
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default App;
