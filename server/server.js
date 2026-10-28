require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : [])
  ]
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "IMovies API is running" });
});

app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);

  if (res.headersSent) return next(err);

  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the server .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // Ensure the seat uniqueness index exists before accepting bookings.
    await mongoose.model("Booking").init();

    app.listen(PORT, () => {
      console.log(`IMovies API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();