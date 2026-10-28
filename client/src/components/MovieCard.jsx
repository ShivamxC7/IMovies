
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const isUpcoming = movie.status === "Coming Soon";
  const isBookingsOpen = movie.status === "Bookings Open";

  const releaseDate = movie.releaseDate
    ? new Date(movie.releaseDate + "T00:00:00").toLocaleDateString(
        "en-IN",
        { day: "numeric", month: "short", year: "numeric" }
      )
    : null;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
        />

        {movie.status && (
          <span
            className={`movie-status ${
              isBookingsOpen
                ? "status-bookings"
                : isUpcoming
                ? "status-upcoming"
                : "status-showing"
            }`}
          >
            {movie.status}
          </span>
        )}
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>{movie.genre} · {movie.duration}</p>

        {releaseDate && (
          <p className="movie-release">
            {isUpcoming || isBookingsOpen ? "Release: " : "Released: "}
            {releaseDate}
          </p>
        )}

        <div className="movie-bottom">
          <span className="rating">
            {movie.rating > 0 ? `★ ${movie.rating}` : "Rating TBA"}
          </span>
          <span>₹{movie.price}</span>
        </div>
      </div>
    </Link>
  );
}
