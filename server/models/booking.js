
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true
    },
    movieId: {
      type: String,
      required: true
    },
    movieTitle: {
      type: String,
      required: true
    },
    showDate: {
      type: String,
      required: true
    },
    showTime: {
      type: String,
      required: true
    },
    seats: {
      type: [String],
      required: true
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

// Prevent the same seat from being booked twice for the same movie and show.
bookingSchema.index(
  { movieId: 1, showDate: 1, showTime: 1, seats: 1 },
  { unique: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
