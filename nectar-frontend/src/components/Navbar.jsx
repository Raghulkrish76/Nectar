import "../styles/Navbar.css";

export function Navbar() {
  // Handle logout: clear everything in localStorage, then reload
  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <nav className="navbar">
      {/* ── Brand ── */}
      <a href="/" className="navbar__brand">
        <span className="navbar__logo">✦</span>
        <span className="navbar__name">Nectar</span>
      </a>

      {/* ── Links + Logout ── */}
      <div className="navbar__menu">
        <ul className="navbar__links">
          <li><a href="/" className="navbar__link">Home</a></li>
          <li><a href="/plants" className="navbar__link">Plants</a></li>
          <li><a href="/about" className="navbar__link">About</a></li>
        </ul>

        <div className="navbar__actions">
          {/* Logout is always visible */}
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
