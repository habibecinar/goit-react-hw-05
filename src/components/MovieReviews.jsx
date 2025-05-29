//İncelemeler hakkında bilgi, MovieDetailsPage sayfasının alt kısmında render edilir.

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=3c5d79694d82b9e1fe6883553a34fc2d`
      );
      const data = await res.json();
      setReviews(data.results);
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available yet. Be the first to share your thoughts!</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>{review.author}:</strong>
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default MovieReviews;
