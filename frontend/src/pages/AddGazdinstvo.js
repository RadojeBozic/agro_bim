import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Layout from "../components/Layout";

function AddGazdinstvo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    naziv: "",
    pib: "",
    maticni_broj: "",
    adresa: "",
    tip: "porodično",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/gazdinstva", form);
      setSuccess("Gazdinstvo je uspešno dodato!");
      setForm({
        naziv: "",
        pib: "",
        maticni_broj: "",
        adresa: "",
        tip: "porodično",
      });
      // navigate("/gazdinstva"); // Ako kasnije napravimo listu
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat();
        setError(messages.join(" "));
      } else {
        setError("Greška prilikom unosa.");
      }
    }
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4">Dodaj gazdinstvo</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Naziv *</label>
            <input
              name="naziv"
              className="form-control"
              value={form.naziv}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">PIB</label>
            <input
              name="pib"
              className="form-control"
              value={form.pib}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Matični broj</label>
            <input
              name="maticni_broj"
              className="form-control"
              value={form.maticni_broj}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Adresa</label>
            <input
              name="adresa"
              className="form-control"
              value={form.adresa}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tip gazdinstva *</label>
            <select
              name="tip"
              className="form-select"
              value={form.tip}
              onChange={handleChange}
            >
              <option value="porodično">Porodično</option>
              <option value="komercijalno">Komercijalno</option>
              <option value="mešovito">Mešovito</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">Sačuvaj</button>
        </form>
      </div>
    </Layout>
  );
}

export default AddGazdinstvo;
