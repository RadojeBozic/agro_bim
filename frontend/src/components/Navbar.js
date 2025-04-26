import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function Navbar() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      API.get("/user")
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
      {/* Logo + naziv */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/images/logo3.png"
          alt="Logo"
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
          className="me-2"
        />
{/*         <span className="fs-5 fw-bold text-white">AGRO B&M</span>
 */}      </Link>

      {/* Collapse dugme za mobilni */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navigacija */}
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        {/* Leva sekcija */}
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/">Početna</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/subvencije">Subvencije</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/saveti">Saveti</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/market">Market</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/korisni-linkovi">Linkovi</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/pravna">Pravna</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/kontakt">Kontakt</Link></li>
        </ul>

        {/* Desna sekcija */}
        <ul className="navbar-nav align-items-center gap-2">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/profil">Moj profil</Link>
              </li>
              {(user.role === "admin" || user.role === "superadmin") && (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-warning btn-sm" to="/admin">Admin kontrola</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-light btn-sm" to="/admin/korisnici">Korisnici</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <div
                  className="rounded-circle bg-light text-success fw-bold text-center"
                  style={{ width: "36px", height: "36px", lineHeight: "36px" }}
                  title={user.name}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                >
                  Odjava
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Prijava</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Registracija</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
