import Layout from "../components/Layout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import API from "../api";

function Kontakt() {
  const [form, setForm] = useState({
    ime: "",
    email: "",
    poruka: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [porukaStatus, setPorukaStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPorukaStatus("");

    try {
      await API.post("/kontakt", form);
      setPorukaStatus("Vaša poruka je uspešno poslata!");
      setForm({ ime: "", email: "", poruka: "" });
    } catch (err) {
      setPorukaStatus("Došlo je do greške pri slanju poruke.");
    }
  };


  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4">Kontaktirajte nas</h2>

        <div className="row">
        {porukaStatus && (
          <div className="alert alert-info">{porukaStatus}</div>
        )}
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Ime i prezime *</label>
                <input
                  type="text"
                  name="ime"
                  className="form-control"
                  value={form.ime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Poruka *</label>
                <textarea
                  name="poruka"
                  className="form-control"
                  rows="5"
                  value={form.poruka}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success">Pošalji poruku</button>
            </form>
          </div>

          {/* Informacije o firmi + mapa */}
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">AGRO BiM DOO</h5>
                <p className="card-text">
                  Kompanija za posredovanje i trgovinu<br />
                  PIB: 1234567<br />
                  MB: 765432<br />
                  Šifre delatnosti: 45678, 8987665, 875034<br />
                  Sedište: Masarikova 10, Šabac, Srbija<br />
                  Tel: <a href="tel:+381640750381">+381 64 0750381</a><br />
                  Email: <a href="mailto:miroslavbozic1988@gmail.com">miroslavbozic1988@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Mapa */}
            <div className="mt-4">
              <MapContainer center={[44.7489, 19.6914]} zoom={15} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[44.7489, 19.6914]}>
                  <Popup>
                    AGRO BiM DOO<br /> Masarikova 10, Šabac
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Kontakt;
