import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat();
        setError(messages.join(" "));
      } else {
        setError("Greška prilikom registracije.");
      }
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="container mt-4" style={{ maxWidth: "500px" }}>
  <h2 className="mb-3">Registracija</h2>
  {error && <div className="alert alert-danger">{error}</div>}

  <div className="mb-3">
    <label className="form-label">Ime *</label>
    <input name="name" className="form-control" value={form.name} onChange={handleChange} />
  </div>

  <div className="mb-3">
    <label className="form-label">Email *</label>
    <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
  </div>

  <div className="mb-3">
    <label className="form-label">Lozinka *</label>
    <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} />
  </div>

  <div className="mb-3">
    <label className="form-label">Potvrdi lozinku *</label>
    <input name="password_confirmation" type="password" className="form-control" value={form.password_confirmation} onChange={handleChange} />
  </div>

  <button type="submit" className="btn btn-success">Registruj se</button>
</form>

    </div>
  );
}

export default Register;
