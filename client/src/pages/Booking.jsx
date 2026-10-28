import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SHOWTIMES = ["12:00 PM", "4:00 PM", "8:00 PM"];
const ROWS = ["A", "B", "C", "D", "E"];
const SEATS = ROWS.flatMap((row) =>
  Array.from({ length: 8 }, (_, i) => `${row}${i + 1}`)
);
const today = new Date();
const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState(todayString);
  const [time, setTime] = useState(SHOWTIMES[0]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/movies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setMovie)
      .catch(() => setMessage("Could not load this movie."));
  }, [id]);

  useEffect(() => {
    setSelectedSeats([]);
    if (!date || !time) return;

    fetch(`${API}/api/bookings/seats?movieId=${id}&date=${date}&time=${encodeURIComponent(time)}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setBookedSeats)
      .catch(() => setMessage("Could not load seat availability."));
  }, [id, date, time]);

  function toggleSeat(seat) {
    setSelectedSeats((current) =>
      current.includes(seat)
        ? current.filter((item) => item !== seat)
        : current.length < 10 ? [...current, seat] : current
    );
  }

  async function handleBooking(e) {
    e.preventDefault();
    setMessage("");

    if (selectedSeats.length === 0) {
      setMessage("Please select at least one seat.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: id,
          showDate: date,
          showTime: time,
          seats: selectedSeats,
          customerName: name,
          customerEmail: email
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed.");

      navigate("/my-bookings", { state: { booking: data } });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!movie) return <p className="page-message">{message || "Loading booking..."}</p>;

  return (
    <main className="booking-page">
      <Link to={`/movie/${id}`} className="back-link">← Back to movie</Link>
      <p className="eyebrow">RESERVE YOUR SEATS</p>
      <h1>Book your tickets</h1>
      <p className="booking-movie">{movie.title} · ₹{movie.price} per seat</p>

      <form onSubmit={handleBooking} className="booking-layout">
        <section className="seat-panel">
          <label className="field-label">Show date</label>
          <input type="date" min={todayString} value={date} onChange={(e) => setDate(e.target.value)} required />

          <label className="field-label">Show time</label>
          <div className="showtimes">
            {SHOWTIMES.map((show) => (
              <button
                type="button"
                key={show}
                className={time === show ? "time-button active" : "time-button"}
                onClick={() => setTime(show)}
              >
                {show}
              </button>
            ))}
          </div>

          <div className="screen">SCREEN</div>
          <div className="seat-grid">
            {SEATS.map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              return (
                <button
                  type="button"
                  key={seat}
                  disabled={isBooked}
                  onClick={() => toggleSeat(seat)}
                  className={`seat ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`}
                  aria-label={`Seat ${seat}${isBooked ? ", booked" : ""}`}
                >
                  {seat}
                </button>
              );
            })}
          </div>
          <div className="seat-legend">
            <span>□ Available</span><span>■ Selected</span><span>× Booked</span>
          </div>
        </section>

        <aside className="checkout-panel">
          <h2>Your details</h2>
          <label className="field-label">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} minLength={2} maxLength={80} required placeholder="Enter your name" />

          <label className="field-label">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />

          <div className="total-row">
            <span>Seats ({selectedSeats.length})</span>
            <strong>₹{selectedSeats.length * movie.price}</strong>
          </div>
          <p className="selected-label">
            {selectedSeats.length ? selectedSeats.join(", ") : "No seats selected"}
          </p>

          {message && <p className="error">{message}</p>}
          <button className="primary-button full-width" disabled={submitting} type="submit">
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </aside>
      </form>
    </main>
  );
}