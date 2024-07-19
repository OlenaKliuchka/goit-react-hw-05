import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import toast from "react-hot-toast";

import { getMoviesReviews } from "../../api/tmdb";
import useLoad from "../../hooks/useLoad";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { loading, setLoading, error, setError } = useLoad();

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(false);
      try {
        const getReviews = await getMoviesReviews(movieId);
        setReviews(getReviews);
      } catch (e) {
        setError(true);
        toast.error(e.message, {
          position: "top-right",
        });
      }
      setLoading(false);
    }

    fetchReviews();
  }, [movieId]);

  return (
    <>
      <ul className="flex flex-col gap-6 m-4">
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
          reviews.map((review) => (
            <li key={review.id} className="bg-gray-200 px-6 py-4 rounded-md">
              <div className="info flex justify-evenly mb-4 text-sm italic">
                <div className="author ">Author: {review.author}</div>
                <div className="rating">
                  Rating: {review.rating > 0 ? review.rating : "N/A"}
                </div>
              </div>
              <div className="review text-lg">{review.content}</div>
            </li>
          ))}
      </ul>
      {reviews.length <= 0 && (
        <div className="text-center text-2xl">
          No one didn`t write review for film yet...
        </div>
      )}
    </>
  );
}
