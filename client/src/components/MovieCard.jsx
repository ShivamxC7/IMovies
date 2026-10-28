import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.genre} · {movie.duration}</p>
        <div className="movie-bottom">
          <span className="rating">★ {movie.rating}</span>
          <span>₹{movie.price}</span>
        </div>
      </div>
    </Link>
  );
}