import { api_key } from '@/constants';
import { apiRequest } from './axios';

const baseUrl: string = 'https://api.themoviedb.org/3';

const trendingMovie: string = `${baseUrl}/trending/movie/day?api_key=${api_key}`;
const upComingMovie: string = `${baseUrl}/movie/upcoming?api_key=${api_key}`;
const topRatedMovie: string = `${baseUrl}/movie/top_rated?api_key=${api_key}`;
const popularMovie: string = `${baseUrl}/movie/popular?api_key=${api_key}`;
const movieDetail = (id: string) => `${baseUrl}/movie/${id}?api_key=${api_key}`;
const movieCredits = (id: string) => `${baseUrl}/movie/${id}/credits?api_key=${api_key}`;
const similarMovie = (id: string) => `${baseUrl}/movie/${id}/similar?api_key=${api_key}`;

export const fetchTrendingMovie = () => {
  return apiRequest(trendingMovie);
};

export const fetchUpcomingMovie = () => {
  return apiRequest(upComingMovie);
};

export const fetchTopRatedMovie = () => {
  return apiRequest(topRatedMovie);
};

export const fetchPopularMovie = () => {
  return apiRequest(popularMovie);
};

export const fetchMovieDetail = (id: string) => {
  return apiRequest(movieDetail(id));
};

export const fetchMovieCredits = (id: string) => {
  return apiRequest(movieCredits(id));
};

export const fetchSimilarMovie = (id: string) => {
  return apiRequest(similarMovie(id));
};

export const image500 = (posterPath: string): string | null => {
  return posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null;
};
export const image342 = (posterPath: string): string | null => {
  return posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
};
export const image185 = (posterPath: string): string | null => {
  return posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;
};
