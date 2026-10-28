import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/api/movies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Movie not found");
        return res.json();
      })
      .then(setMovie)
      .catch(() => setError("Could not load this movie."));
  }, [id]);

  if (error) return <p className="page-message">{error}</p>;
  if (!movie) return <p className="page-message">Loading movie...</p>;

  return (
    <main className="details-page">
      <img className="details-poster" src={movie.poster} alt={movie.title} />
      <div className="details-content">
        <p className="eyebrow">FEATURED MOVIE</p>
        <h1>{movie.title}</h1>
        <p className="details-meta">★ {movie.rating} · {movie.genre} · {movie.duration}</p>
        <p className="description">{movie.description}</p>
        <p className="ticket-price">Tickets from ₹{movie.price}</p>
        <Link className="primary-button" to={`/booking/${movie.id}`}>
          Book Tickets →
        </Link>
      </div>
    </main>
  );
}