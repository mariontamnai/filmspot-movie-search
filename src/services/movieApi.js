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


export const fetchTrendingMovies = async () => {
  const { data } = await api.get("/trending/movie/week");
  return data.results;
};

export const fetchMoviesByCategory = async (category) => {
  const { data } = await api.get(`/movie/${category}`);
  return data.results;
};


export const fetchGenres = async () => {
  const { data } = await api.get("/genre/movie/list");
  return data.genres; 
};


export const fetchMoviesByGenre = async (genreId) => {
  const { data } = await api.get("/discover/movie", {
    params: { with_genres: genreId },
  });
  return data.results;
};


export const fetchMovies = async (query) => {
  const { data } = await api.get("/search/movie", {
    params: { query },
  });
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "videos"
    }
  });
  return data;
};

export const fetchMovieVideos =async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/videos`);
  return data.results;
};