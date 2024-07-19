import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTrendingMovies } from "../../api/tmdb";
import useLoad from "../../hooks/useLoad";

import { ColorRing } from "react-loader-spinner";

import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const { loading, setLoading, error, setError } = useLoad();

  useEffect(() => {
    async function fetchTrendMovies() {
      setLoading(true);
      setError(false);
      try {
        const getMovies = await getTrendingMovies();
        setMovies(getMovies.results);
      } catch (e) {
        setError(true);
        toast.error(e.message, {
          position: "top-right",
        });
      }
      setLoading(false);
    }

    fetchTrendMovies();
  }, []);

  return (
    <main className="mb-6 mt-16">
      <div className="container mx-auto px-5">
        <h1 className="text-6xl my-6 font-bold">Trending today</h1>
        {loading && (
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper mx-auto"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        )}
        {!loading && !error && <MovieList movies={movies} />}
      </div>
    </main>
  );
}
