import MovieItem from "../MovieItem/MovieItem";

export default function MovieList({ movies }) {
  return (
    <ul className="flex gap-5 flex-wrap bg-violet-100 py-8 px-6 rounded-xl">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="flex-auto basis-full sm:basis-1/3 lg:basis-1/4 
              xl:basis-1/5 2xl:basis-1/6 bg-white rounded-lg"
        >
          <MovieItem movie={movie} />
        </li>
      ))}
    </ul>
  );
}
