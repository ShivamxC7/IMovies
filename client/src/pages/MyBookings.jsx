import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyBookings() {
  const location = useLocation();
  const [bookingId, setBookingId] = useState(location.state?.booking?.bookingId || "");
  const [booking, setBooking] = useState(location.state?.booking || null);
  const [error, setError] = useState("");

  async function findBooking(e) {
    e.preventDefault();
    setError("");
    setBooking(null);

    try {
      const res = await fetch(`${API}/api/bookings/${encodeURIComponent(bookingId.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking not found.");
      setBooking(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="my-bookings-page">
      <p className="eyebrow">YOUR RESERVATIONS</p>
      <h1>My Bookings</h1>
      <p className="muted">Enter your booking ID to retrieve your ticket.</p>

      <form className="lookup-form" onSubmit={findBooking}>
        <input
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          placeholder="Paste your booking ID"
          required
        />
        <button className="primary-button" type="submit">Find Ticket</button>
      </form>

      {error && <p className="error">{error}</p>}

      {booking && (
        <section className="ticket">
          <p className="eyebrow">BOOKING CONFIRMED</p>
          <h2>{booking.movieTitle}</h2>
          <p><strong>Booking ID:</strong> {booking.bookingId}</p>
          <p><strong>Name:</strong> {booking.customerName}</p>
          <p><strong>Date:</strong> {booking.showDate}</p>
          <p><strong>Show:</strong> {booking.showTime}</p>
          <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
          <p><strong>Total paid:</strong> ₹{booking.totalPrice}</p>
          <button className="primary-button" onClick={() => window.print()}>Print Ticket</button>
        </section>
      )}

      <Link to="/" className="back-link">← Browse movies</Link>
    </main>
  );
}