import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function AdminDashboard() {
  const [stat, setStat] = useState(null);

  useEffect(() => {
    API.get("/admin/statistika")
      .then(res => setStat(res.data))
      .catch(() => {
        console.error("Greška prilikom učitavanja statistike.");
      });
  }, []);

  if (!stat) return <Layout><p>Učitavanje...</p></Layout>;

  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4">Admin Panel – Statistika</h2>
        <div className="row g-4">
          <StatCard title="Korisnika" value={stat.korisnika} color="primary" icon="bi-people" />
          <StatCard title="Poruka" value={stat.poruka} color="info" icon="bi-envelope" />
          <StatCard title="Gazdinstava" value={stat.gazdinstava} color="success" icon="bi-house" />
          <StatCard title="Dokumenata" value={stat.dokumenata} color="warning" icon="bi-folder2-open" />
          

        </div>
      </div>
    </Layout>
  );
}


function StatCard({ title, value, color, icon }) {
  return (
    <div className="col-md-3">
      <div className={`card text-white bg-${color} shadow`}>
        <div className="card-body d-flex align-items-center">
          <i className={`bi ${icon} fs-1 me-3`}></i>
          <div>
            <h6 className="card-title">{title}</h6>
            <h3 className="card-text">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
