import React, { useEffect, useState} from "react";
import "./App.css";
import { fetchMovies } from "./services/movieApi";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies("Mean Girls");
      console.log(data.results[0]);
      setMovies(data.results || []);
    };
    loadMovies();
  }, []);
  return (
    <div className="App">
      <h1>FilmSpot</h1>
      <p>Search and discover your favorite movies here!</p>
      <ul>
  {movies.map((movie) => (
    <li key={movie.id}>
      {movie.title || movie.name || "No title"}{" "}
      ({movie.release_date ? movie.release_date.slice(0, 4) : "N/A"})
    </li>
  ))}
</ul>

    </div>
  );
}
export default App