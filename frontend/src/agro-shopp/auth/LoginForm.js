import React, { useState } from "react";
import { useSmartAuth } from "../../context/SmartAuthContext";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useSmartAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email je obavezan.";
    if (!form.password) newErrors.password = "Lozinka je obavezna.";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      const res = await login(form.email, form.password);
      const user = res.data.user;

      if (user.role === "admin") {
        navigate("/agro-shopp/home");
      } else {
        navigate("/agro-shopp/products");
      }
    } catch (err) {
      setErrors({ global: "Neuspešna prijava. Proverite podatke." });
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Uloguj se</h2>

      {errors.global && <div className="alert alert-danger">{errors.global}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email *</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>

        <div className="mb-3">
          <label>Lozinka *</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>

        <button className="btn btn-success w-100">Uloguj se</button>
      </form>

      <div className="mt-3 text-center">
        <span className="text-muted">Nemate nalog? </span>
        <Link to="/agro-shopp/register">Registruj se u Agro-shopp</Link>
      </div>
    </div>
  );
}

export default LoginForm;
