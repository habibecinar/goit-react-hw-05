// Oyuncu kadrosu hakkında bilgi, MovieDetailsPage sayfasının alt kısmında render edilir.

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3c5d79694d82b9e1fe6883553a34fc2d`
        );
        if (!res.ok) throw new Error("Veri alınamadı");
        const data = await res.json();
        setCast(data.cast || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (cast.length === 0) return <p>Sorry, we couldn't find any cast information.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {cast.map((actor) => (
        <div
          key={actor.cast_id}
          style={{ width: "150px", textAlign: "center" }}
        >
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/150x225?text=No+Image"
            }
            alt={actor.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <p>
            <strong>{actor.name}</strong>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>{actor.character}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieCast;
