import React, { useEffect, useState} from "react";
import "./App.css";
import { fetchMovies } from ".services/movieApi";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies("avengers");
      setMovies(data);
    };
    loadMovies();
  }, []);
  return (
    <div className="App">
      <h1>FilmSpot</h1>
      <p>Search and discover your favorite movies here!</p>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.tittle}</li>
        ))}
      </ul>
    </div>
  );
}
export default App