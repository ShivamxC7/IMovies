import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">i<span>MOVIES</span></Link>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/my-bookings">My Bookings</NavLink>
      </div>
    </nav>
  );
}