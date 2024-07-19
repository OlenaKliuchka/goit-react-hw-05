const base = "https://api.themoviedb.org/3";
export const imagePathBase = "https://image.tmdb.org/t/p/w500";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzI2Njg3NjAxOWQwN2ZjYTFlNjM3OWNlMWQ0NTIzZiIsIm5iZiI6MTcyMTA2OTIwNy43Mzc0MjEsInN1YiI6IjY2OTU2Yzk4YThkYTRhNWU2ODhjY2JiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sDag25_YUpDFxUKWDJ16otHIVEOiZ0EwqpmemiwBvUY",
    accept: "application/json",
  },
};

export async function getTrendingMovies() {
  const response = await fetch(`${base}/trending/movie/day`, options);
  const data = await response.json();
  return data;
}

export async function getMovieById(movieId) {
  const response = await fetch(`${base}/movie/${movieId}`, options);
  const data = await response.json();
  return data;
}

export async function getMovieCredits(movieId) {
  const response = await fetch(`${base}/movie/${movieId}/credits`, options);
  const data = await response.json();

  return getPopularityCast(data.cast);
}

function getPopularityCast(cast, maxNumberOfCast = 5) {
  const sortedCast = cast.toSorted((first, second) => {
    return second.popularity - first.popularity;
  });

  return sortedCast.slice(0, maxNumberOfCast);
}

export async function getMoviesReviews(movieId) {
  const response = await fetch(`${base}/movie/${movieId}/reviews`, options);
  const reviews = await response.json();

  const result = reviews.results.map((review) => {
    return {
      id: review.id,
      author: review.author,
      content: review.content,
      rating: review.author_details.rating,
    };
  });

  return result;
}

export async function getMovieByName(query) {
  const response = await fetch(
    `${base}/search/movie?query=${query}&include_adult=true`,
    options
  );
  const movies = await response.json();

  return movies.results;
}
