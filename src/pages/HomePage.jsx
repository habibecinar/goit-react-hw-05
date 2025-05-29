// popüler film listesi ve ana sayfa - Movielisti burda kullan

import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";


function HomePage() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchMovies() {
            try {
                setLoading(true);
                const response = await fetch(
                  "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=3c5d79694d82b9e1fe6883553a34fc2d"
                );
                const data = await response.json();

                setMovies(data.results);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);
    
    return (
        
        <div>
            <h2>Trending Today</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    );
}
export default HomePage;