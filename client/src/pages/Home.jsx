import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/api/movies`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load movies");
        return res.json();
      })
      .then(setMovies)
      .catch(() => setError("Unable to load movies. Check that the backend is running."))
      .finally(() => setLoading(false));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">YOUR CINEMA EXPERIENCE</p>
        <h1>Stories worth<br /><span>watching.</span></h1>
        <p className="hero-description">
          Discover your next favourite movie and book your seats.
        </p>
        <a href="#movies" className="primary-button">Explore Movies ↓</a>
      </section>

      <section className="movies-section" id="movies">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NOW SHOWING</p>
            <h2>Explore Movies</h2>
          </div>
          <input
            className="search-input"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <p>Loading movies...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && filteredMovies.length === 0 && (
          <p>No movies found.</p>
        )}

        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <footer>© 2026 iMOVIES · Your next story starts here.</footer>
    </main>
  );
}