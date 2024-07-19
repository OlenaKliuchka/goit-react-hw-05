import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, imagePathBase } from "../../api/tmdb";
import useLoad from "../../hooks/useLoad";
import toast from "react-hot-toast";
import { Circles } from "react-loader-spinner";

export default function MovieCast() {
  const [casts, setCasts] = useState([]);
  const { loading, setLoading, error, setError } = useLoad();

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCast() {
      setLoading(true);
      setError(false);
      try {
        const movieCast = await getMovieCredits(movieId);
        setCasts(movieCast);
      } catch (e) {
        setError(true);
        toast.error(e.message, {
          position: "top-right",
        });
      }
      setLoading(false);
    }
    fetchCast();
  }, [movieId]);
  return (
    <ul className="casts-list flex flex-wrap gap-6 my-10">
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
      {!loading &&
        !error &&
        casts.map((cast) => (
          <li
            key={cast.id}
            className="cast-item flex-[1_1_calc((100%-48px)_/_3)]
          border-2 border-gray-300 border-solid p-2 rounded-md"
          >
            <div className="cast-info flex flex-col">
              <figure className="cast-image-wrapper w-full">
                <img
                  src={imagePathBase + "/" + cast.profile_path}
                  className="object-cover w-full h-72"
                />
                <figcaption className="text-xl font-semibold text-center">
                  {cast.name}
                </figcaption>
              </figure>
              <span className="character text-sm text-center">
                Character: {cast.character}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}
