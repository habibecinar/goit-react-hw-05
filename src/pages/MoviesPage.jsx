// Anahtar kelime ile film arama sayfası- MovieListi burda kullan
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList"; // yol senin yapına göre değişebilir


function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get("query") ?? "";

    function handleSubmit(e) {
      e.preventDefault();
      if (searchTerm.trim()) {
        setSearchParams({ query: searchTerm.trim() });
      }
    }


    useEffect(() => {
      async function fetchMovies() {
        try {
          setLoading(true);
          setError(null); // Her aramada önceki hatayı temizle
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=3c5d79694d82b9e1fe6883553a34fc2d`
          );
          const data = await response.json();

          if (data.results.length === 0) {
            setError("No movies found matching your search.");
            setMovies([]); // Eski sonuçları temizle
          } else {
            setMovies(data.results);
          }
        } catch (error) {
          setError(error.message);
          setMovies([]); // Hata varsa sonuçları temizle
        } finally {
          setLoading(false);
        }
      }

      if (query) {
        fetchMovies();
      } else {
        setMovies([]);
        setError(null);
      }
    }, [query]);

   
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movie..."
          />
          <button type="submit">Search</button>
        </form>

       
        {/* Buraya form eklenecek */}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    );
}  
export default MoviesPage;