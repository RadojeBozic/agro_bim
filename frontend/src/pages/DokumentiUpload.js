import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";

function DokumentiUpload() {
  const [gazdinstva, setGazdinstva] = useState([]);
  const [selectedGazdinstvo, setSelectedGazdinstvo] = useState("");
  const [naziv, setNaziv] = useState("");
  const [fajl, setFajl] = useState(null);
  const [poruka, setPoruka] = useState("");
  const [dokumenti, setDokumenti] = useState([]);
  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovaj dokument?")) {
      try {
        await API.delete(`/dokumenti/${id}`);
        const res = await API.get(`/dokumenti/${selectedGazdinstvo}`);
        setDokumenti(res.data); // osveži listu
        setPoruka("Dokument je uspešno obrisan.");
      } catch {
        setPoruka("Greška pri brisanju dokumenta.");
      }
    }
  };
  
  // Učitaj gazdinstva pri učitavanju stranice
  useEffect(() => {
    API.get("/gazdinstva").then((res) => {
      setGazdinstva(res.data);
    });
  }, []);

  // Učitaj dokumente kada izaberemo gazdinstvo
  useEffect(() => {
    if (selectedGazdinstvo) {
      API.get(`/dokumenti/${selectedGazdinstvo}`).then((res) => {
        setDokumenti(res.data);
      });
    }
  }, [selectedGazdinstvo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPoruka("");

    if (!selectedGazdinstvo || !naziv || !fajl) {
      setPoruka("Sva polja su obavezna!");
      return;
    }

   
      

    const formData = new FormData();
    formData.append("gazdinstvo_id", selectedGazdinstvo);
    formData.append("naziv", naziv);
    formData.append("fajl", fajl);

    try {
      await API.post("/dokumenti", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPoruka("Dokument uspešno dodat.");
      setNaziv("");
      setFajl(null);
      // osveži dokumente
      const res = await API.get(`/dokumenti/${selectedGazdinstvo}`);
      setDokumenti(res.data);
    } catch (err) {
      setPoruka("Greška prilikom slanja.");
    }
  };

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "700px" }}>
        <h2 className="mb-4">Upload dokumenata</h2>

        {poruka && <div className="alert alert-info">{poruka}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Izaberi gazdinstvo *</label>
            <select
              className="form-select"
              value={selectedGazdinstvo}
              onChange={(e) => setSelectedGazdinstvo(e.target.value)}
            >
              <option value="">-- Izaberi --</option>
              {gazdinstva.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.naziv}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Filtriraj po tipu</label>
            <select
                className="form-select"
                onChange={(e) => {
                const tip = e.target.value;
                if (tip === "") {
                    API.get(`/dokumenti/${selectedGazdinstvo}`).then(res => setDokumenti(res.data));
                } else {
                    API.get(`/dokumenti/${selectedGazdinstvo}`).then(res => {
                    const filtrirani = res.data.filter(doc => doc.tip === tip);
                    setDokumenti(filtrirani);
                    });
                }
                }}
            >
                <option value="">-- Prikaži sve --</option>
                <option value="pdf">PDF</option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="docx">Word dokument</option>
            </select>
            </div>


          <div className="mb-3">
            <label className="form-label">Naziv dokumenta *</label>
            <input
              type="text"
              className="form-control"
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fajl *</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setFajl(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Pošalji
          </button>
        </form>

        <hr />

        {dokumenti.length > 0 && (
          <div>
            <h4>Dokumenti za izabrano gazdinstvo:</h4>
            <ul className="list-group">
              {dokumenti.map((doc) => (
               <li key={doc.id} className="list-group-item d-flex justify-content-between align-items-center">
               <div>
                 {doc.naziv} <small className="text-muted">({doc.tip})</small>
               </div>
               <div>
                 <a className="btn btn-sm btn-outline-primary me-2"
                    href={`http://localhost:8000/storage/${doc.putanja}`}
                    target="_blank" rel="noopener noreferrer">
                    Preuzmi
                 </a>
                 <button className="btn btn-sm btn-outline-danger"
                         onClick={() => handleDelete(doc.id)}>
                    Obriši
                 </button>
               </div>
             </li>             
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default DokumentiUpload;
