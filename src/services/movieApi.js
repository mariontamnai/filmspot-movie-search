import axios from "axios"
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

// Fetch trending movies
export const fetchTrendingMovies = async () => {
  const { data } = await api.get("/trending/movie/week");
  return data.results;
};

// Fetch movies by category
export const fetchMoviesByCategory = async (category) => {
  const { data } = await api.get(`/movie/${category}`);
  return data.results;
};

// Fetch genres
export const fetchGenres = async () => {
  const { data } = await api.get("/genre/movie/list");
  return data.genres; 
};

// Fetch movies by genre ID
export const fetchMoviesByGenre = async (genreId) => {
  const { data } = await api.get("/discover/movie", {
    params: { with_genres: genreId },
  });
  return data.results;
};

// Fetch movies by search query
export const fetchMovies = async (query) => {
  const { data } = await api.get("/search/movie", {
    params: { query },
  });
  return data.results;
};