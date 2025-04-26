import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function AdminUsers() {
  const [korisnici, setKorisnici] = useState([]);
  const [poruka, setPoruka] = useState("");

  useEffect(() => {
    API.get("/admin/korisnici").then(res => setKorisnici(res.data));
  }, []);

  const handleRoleChange = async (id, novaRola) => {
    try {
      await API.put(`/admin/korisnici/${id}`, { role: novaRola });
      setKorisnici(prev =>
        prev.map(k => k.id === id ? { ...k, role: novaRola } : k)
      );
      setPoruka("Uloga uspešno promenjena.");
    } catch (err) {
      setPoruka(err.response?.data?.message || "Greška pri promeni uloge.");
    }
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4">Korisnici – upravljanje ulogama</h2>

        {poruka && <div className="alert alert-info">{poruka}</div>}

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Ime</th>
                <th>Email</th>
                <th>Uloga</th>
                <th>Datum registracije</th>
              </tr>
            </thead>
            <tbody>
              {korisnici.map((k, index) => (
                <tr key={k.id}>
                  <td>{index + 1}</td>
                  <td>{k.name}</td>
                  <td>{k.email}</td>
                  <td>
                    {k.role === 'superadmin' ? (
                      <strong className="text-danger">superadmin</strong>
                    ) : (
                      <select
                        className="form-select"
                        value={k.role}
                        onChange={(e) => handleRoleChange(k.id, e.target.value)}
                      >
                        <option value="korisnik">korisnik</option>
                        <option value="autor">autor</option>
                        <option value="admin">admin</option>
                      </select>
                    )}
                  </td>
                  <td>{new Date(k.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AdminUsers;
