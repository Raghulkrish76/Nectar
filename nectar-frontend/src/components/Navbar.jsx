import "../styles/Navbar.css";
import useAuth from "../hooks/useAuth";
export function Navbar() {

  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }
  const {isAdmin} = useAuth()
  return (
    <nav className="navbar">
   
      <a href="/" className="navbar__brand">
        <span className="navbar__logo">✦</span>
        <span className="navbar__name">Nectar</span>
      </a>

    
      <div className="navbar__menu">
        <ul className="navbar__links">
          <li><a href="/" className="navbar__link">Home</a></li>
          <li><a href="/plants" className="navbar__link">Plants</a></li>
          <li><a href="/about" className="navbar__link">About</a></li>
          {isAdmin && (
                    <li>
                        <a>Admin Account </a>
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
