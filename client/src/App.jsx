import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
