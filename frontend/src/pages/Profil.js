import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api";

function Profil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/user")
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  if (!user) return <Layout><p>Učitavanje...</p></Layout>;

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4">Moj profil</h2>
        <div className="card">
          <div className="card-body">
            <p><strong>Ime:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Uloga:</strong> {user.role}</p>
            <p><strong>Registrovan:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profil;
