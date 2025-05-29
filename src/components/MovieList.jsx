//Film listesini görüntülemek için

import { Link, useLocation } from "react-router-dom";

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default MovieList;