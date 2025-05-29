//Film hakkında detaylı bilgi
import { useParams, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function MovieDetailsPage() {
  const { movieId } = useParams(); // URL'deki :movieId değerini alıyor
  const location = useLocation(); // Geri dönüş için
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=3c5d79694d82b9e1fe6883553a34fc2d&language=en-US`
        );
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (!movie) return null;

  const { title, overview, genres, vote_average, poster_path } = movie;

  return (
    <div style={{ padding: "1rem" }}>
      <Link className="goback-btn" to={location.state?.from ?? "/"}>Go back</Link>
      <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={title}
          style={{ borderRadius: "8px" }}
        />
        <div>
          <h2>{title}</h2>
          <p>
            <strong>User Score:</strong> {Math.round(vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <ul
        style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0 }}
      >
        <li className="movie-details">
          <Link to="cast">Cast</Link>
        </li>
        <li className="movie-details">
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
export default MovieDetailsPage;