import "../styles/Navbar.css";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export function Navbar() {

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  const { isAdmin } = useAuth();

  return (
    <nav className="navbar">

      <Link to="/" className="navbar__brand">
        <span className="navbar__logo">✦</span>
        <span className="navbar__name">Nectar</span>
      </Link>

      <div className="navbar__menu">
        <ul className="navbar__links">
          <li>
            <Link to="/" className="navbar__link">Home</Link>
          </li>

          <li>
            <Link className="navbar__link">Plants</Link>
          </li>

          <li>
            <Link to="/aboutus/" className="navbar__link">About</Link>
          </li>

          {isAdmin && (
            <li>
              <Link to="/admin-dashboard" className="navbar__link">
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__btn navbar__btn--logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}