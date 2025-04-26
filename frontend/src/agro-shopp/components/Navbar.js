import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSmartAuth } from "../../context/SmartAuthContext";

function Navbar() {
  const { user, logout, isLoggedIn, loading } = useSmartAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/agro-shopp/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
      {/* Brend */}
      <Link className="navbar-brand" to="/agro-shopp/home">
        🛒 Agro-shopp
      </Link>

      {/* Toggler */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarAgro"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarAgro">
        {/* Leva navigacija */}
        <ul className="navbar-nav me-2">
          <li className="nav-item">
            <Link to="/agro-shopp/products" className="nav-link text-white">
              📦 Lista proizvoda
            </Link>
          </li>
        </ul>

        {/* Sredina – Pretraga */}
        <form className="d-flex me-3" onSubmit={handleSearch}>
          <input
            className="form-control form-control-sm"
            type="search"
            placeholder="Pretraga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-warning btn-sm ms-2" type="submit">
            🔍
          </button>
        </form>

        {/* Desno – korisničke opcije */}
        <ul className="navbar-nav align-items-center gap-2">
          {!loading && isLoggedIn && user?.role === "admin" && (
            <>
              <li className="nav-item">
                <Link to="/agro-shopp/products" className="btn btn-outline-light btn-sm">
                  ➕ Uredi proizvode
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/agro-shopp/add-product" className="btn btn-warning btn-sm">
                  ➕ Unesi novi proizvod
                </Link>
              </li>
            </>
          )}

          {isLoggedIn ? (
            <>
              <li className="nav-item text-white">👤 {user.first_name}</li>
              <li className="nav-item">
                <button onClick={logout} className="btn btn-outline-light btn-sm">
                  Odjava
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/agro-shopp/login" className="btn btn-outline-light btn-sm">
                  Prijava
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/agro-shopp/register" className="btn btn-light btn-sm">
                  Registracija
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
