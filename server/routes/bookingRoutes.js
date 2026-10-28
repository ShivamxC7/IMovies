const express = require("express");
const { randomUUID } = require("crypto");
const router = express.Router();

const Booking = require("../models/booking");
const movies = require("../data/movies");

const SHOWTIMES = ["12:00 PM", "4:00 PM", "8:00 PM"];
const TICKET_PRICE = 200;
const VALID_SEATS = new Set(
  ["A", "B", "C", "D", "E"].flatMap((row) =>
    Array.from({ length: 8 }, (_, i) => `${row}${i + 1}`)
  )
);

function validShow(movieId, date, time) {
  return (
    movies.some((movie) => movie.id === movieId) &&
    /^\d{4}-\d{2}-\d{2}$/.test(date || "") &&
    !Number.isNaN(Date.parse(`${date}T00:00:00`)) &&
    date >= new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata"
    }) &&
    SHOWTIMES.includes(time)
  );
}

// GET booked seats for a particular movie, date and showtime
router.get("/seats", async (req, res, next) => {
  try {
    const { movieId, date, time } = req.query;

    if (!validShow(movieId, date, time)) {
      return res.status(400).json({ message: "Invalid movie or show details" });
    }

    const bookings = await Booking.find({
      movieId,
      showDate: date,
      showTime: time
    }).select("seats -_id");

    res.json(bookings.flatMap((booking) => booking.seats));
  } catch (error) {
    next(error);
  }
});

// Create a booking
router.post("/", async (req, res, next) => {
  try {
    const {
      movieId,
      showDate,
      showTime,
      seats,
      customerName,
      customerEmail
    } = req.body;

    const movie = movies.find((item) => item.id === movieId);

    if (!movie || !validShow(movieId, showDate, showTime)) {
      return res.status(400).json({ message: "Invalid movie or show details" });
    }

    if (
      !Array.isArray(seats) ||
      seats.length === 0 ||
      seats.length > 10 ||
      !seats.every((seat) => typeof seat === "string" && VALID_SEATS.has(seat)) ||
      new Set(seats).size !== seats.length
    ) {
      return res.status(400).json({ message: "Select valid seats" });
    }

    if (
      typeof customerName !== "string" ||
      customerName.trim().length < 2 ||
      customerName.trim().length > 80 ||
      typeof customerEmail !== "string" ||
      customerEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())
    ) {
      return res.status(400).json({ message: "Enter a valid name and email" });
    }

    const booking = await Booking.create({
      bookingId: randomUUID(),
      movieId,
      movieTitle: movie.title,
      showDate,
      showTime,
      seats,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      totalPrice: seats.length * TICKET_PRICE
    });

    res.status(201).json(booking);
  } catch (error) {
    // The unique database index prevents simultaneous duplicate seat bookings.
    if (error.code === 11000) {
      return res.status(409).json({
        message: "One or more selected seats have already been booked. Please select other seats."
      });
    }

    next(error);
  }
});

// Retrieve booking confirmation
router.get("/:bookingId", async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      bookingId: req.params.bookingId
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
});

module.exports = router;