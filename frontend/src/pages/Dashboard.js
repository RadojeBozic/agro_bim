import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";
import exampleImg from "../assets/images/agro1.jpg"; // Slika 700x467 (ako želiš ilustraciju)

function Dashboard() {
  const [gazdinstva, setGazdinstva] = useState([]);
  const [dokumenta, setDokumenta] = useState([]);
  const [tipovi, setTipovi] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gazdinstvaRes = await API.get("/gazdinstva");
        const gazdinstvaData = gazdinstvaRes.data;
        setGazdinstva(gazdinstvaData);

        // Uzimamo dokumente za sva gazdinstva korisnika
        const allDocs = [];

        for (const g of gazdinstvaData) {
          const res = await API.get(`/dokumenti/${g.id}`);
          allDocs.push(...res.data);
        }

        setDokumenta(allDocs);

        // Grupisanje po tipu
        const grouped = {};
        allDocs.forEach(doc => {
          const tip = doc.tip || "nepoznat";
          grouped[tip] = (grouped[tip] || 0) + 1;
        });

        setTipovi(grouped);
      } catch (err) {
        console.error("Greška pri učitavanju:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p>Učitavanje...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4">Dashboard – pregled stanja</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Ukupno gazdinstava</h5>
                <p className="card-text fs-3">{gazdinstva.length}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Ukupno dokumenata</h5>
                <p className="card-text fs-3">{dokumenta.length}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-dark mb-3">
              <div className="card-body">
                <h5 className="card-title">Tipovi dokumenata</h5>
                <ul className="list-unstyled mb-0">
                  {Object.entries(tipovi).map(([tip, broj]) => (
                    <li key={tip}>
                      <strong>{tip.toUpperCase()}</strong>: {broj}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <h5>Brzi pristup</h5>
        <div className="d-flex gap-3 flex-wrap">
          <a href="/gazdinstvo/dodaj" className="btn btn-outline-primary">Dodaj gazdinstvo</a>
          <a href="/dokumenti" className="btn btn-outline-success">Dodaj dokument</a>
          <a href="/gazdinstva" className="btn btn-outline-secondary">Pregled gazdinstava</a>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;