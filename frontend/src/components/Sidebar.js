import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "220px", minHeight: "100vh" }}>
      <h5 className="text-light">AGRO BiM</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/subvencije">Subvencije</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/profil">Moj profil</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/gazdinstvo/dodaj">Dodaj gazdinstvo</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/gazdinstva">Moja gazdinstva</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/dokumenti">Dokumenti</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
