import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function GazdinstvaList() {
  const [lista, setLista] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/gazdinstva")
      .then(res => setLista(res.data))
      .catch(() => {
        setError("Greška prilikom učitavanja gazdinstava.");
      });
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4">Moja gazdinstva</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {lista.length === 0 ? (
          <p>Nemate sačuvanih gazdinstava.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Naziv</th>
                  <th>PIB</th>
                  <th>Matični broj</th>
                  <th>Adresa</th>
                  <th>Tip</th>
                  <th>Kreirano</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.naziv}</td>
                    <td>{item.pib || "-"}</td>
                    <td>{item.maticni_broj || "-"}</td>
                    <td>{item.adresa || "-"}</td>
                    <td>{item.tip}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default GazdinstvaList;
