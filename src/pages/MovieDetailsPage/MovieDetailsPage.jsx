import { Suspense, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";

import { getMovieById, imagePathBase } from "../../api/tmdb";
import useLoad from "../../hooks/useLoad";
import { HiMiniArrowLongLeft } from "react-icons/hi2";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const { loading, setLoading, error, setError } = useLoad();

  const { movieId } = useParams();

  const location = useLocation();

  useEffect(() => {
    async function fetchFilm() {
      setLoading(true);
      setError(false);
      try {
        const fetchMovie = await getMovieById(movieId);
        setMovie(fetchMovie);
      } catch (e) {
        setError(true);
        toast.error(e.message, {
          position: "top-right",
        });
      }
      setLoading(false);
    }

    fetchFilm();
  }, [movieId]);

  const genresString = movie.genres
    ? movie.genres.map((genre) => genre.name).join(", ")
    : "Loading...";

  const producersString = movie.production_companies
    ? movie.production_companies.map((prod) => prod.name).join(", ")
    : "Loading...";

  const overviewString =
    movie.overview?.length > 320
      ? movie.overview.slice(0, 320) + "..."
      : movie.overview;

  return (
    <main className="mt-16">
      <div className="container mx-auto max-w-[700px]">
        {loading && (
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        {!loading && !error && (
          <>
            <Link
              to={location.state ?? "/movies"}
              type="buttom"
              className="flex items-center gap-4 bg-violet-300 max-w-[max-content] py-3 px-6 rounded-md
              hover:bg-violet-400 hover:text-white duration-150"
            >
              <HiMiniArrowLongLeft /> Back to films
            </Link>
            <h1 className="text-6xl my-6 font-bold">{movie.title}</h1>
            <div className="main-info flex gap-7">
              <div className="img-wrapper h-96 flex-[0_0_16rem]">
                <img
                  src={imagePathBase + movie.poster_path}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="info flex-col w-full">
                <div className="tagline flex mb-5">
                  <span className="key font-semibold flex-[1_1_30%]">
                    Tagline:
                  </span>
                  <span className="value flex-[1_1_70%]">
                    {movie.tagline?.length <= 0 ? "N/A" : movie.tagline}
                  </span>
                </div>

                <div className="genre flex mb-5">
                  <span className="key font-semibold flex-[1_1_30%]">
                    Genre:
                  </span>
                  <span className="value flex-[1_1_70%]">
                    {genresString?.length <= 0 ? "N/A" : genresString}
                  </span>
                </div>

                <div className="producers flex mb-5">
                  <span className="key font-semibold flex-[1_1_30%]">
                    Producers:
                  </span>
                  <span className="value flex-[1_1_70%]">
                    {producersString?.length <= 0 ? "N/A" : producersString}
                  </span>
                </div>

                <div className="overview flex mb-5">
                  <span className="key font-semibold flex-[1_1_30%]">
                    Overview:
                  </span>
                  <span className="value flex-[1_1_70%] max-h-56 overflow-hidden">
                    {overviewString}
                  </span>
                </div>
              </div>
            </div>
            <div className="additional-info mt-8 flex justify-evenly items-center">
              <NavLink
                to={"cast"}
                state={location.state ?? "/movies"}
                className="bg-violet-400 p-4 rounded-md text-white transition-colors duration-150 hover:bg-violet-500"
              >
                Show cast
              </NavLink>
              <NavLink
                to={"reviews"}
                state={location.state ?? "/movies"}
                className="bg-violet-400 p-4 rounded-md text-white transition-colors duration-150 hover:bg-violet-500"
              >
                Show Reviews
              </NavLink>
            </div>

            <Suspense
              fallback={
                <Circles
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              }
            >
              <Outlet />
            </Suspense>
          </>
        )}
      </div>
    </main>
  );
}
