import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSmartAuth } from "../../context/SmartAuthContext";

function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useSmartAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    birth_date: "",
    gender: "",
    newsletter: false,
    accepted_terms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.first_name) newErrors.first_name = "Ime je obavezno.";
    if (!form.last_name) newErrors.last_name = "Prezime je obavezno.";
    if (!form.email) newErrors.email = "Email je obavezan.";
    if (!form.password) newErrors.password = "Lozinka je obavezna.";
    if (form.password !== form.password_confirmation)
      newErrors.password_confirmation = "Lozinke se ne poklapaju.";
    if (!form.accepted_terms)
      newErrors.accepted_terms = "Morate prihvatiti uslove korišćenja.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      await register(form);
      navigate("/agro-shopp/home");
    } catch (err) {
      setErrors({ global: "Greška prilikom registracije." });
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Registracija – Agro-shopp Smart</h2>

      {errors.global && <div className="alert alert-danger">{errors.global}</div>}

      <form onSubmit={handleSubmit}>
      <div className="row">
          <div className="col-md-6 mb-3">
            <label>Ime *</label>
            <input
              className="form-control"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
          </div>

          <div className="col-md-6 mb-3">
            <label>Prezime *</label>
            <input
              className="form-control"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
          </div>
        </div>

        <div className="mb-3">
          <label>Email *</label>
          <input
            className="form-control"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label>Lozinka *</label>
          <input
            className="form-control"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Potvrdi lozinku *</label>
          <input
            className="form-control"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            placeholder="Ponovite lozinku"
            value={form.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && <small className="text-danger">{errors.password_confirmation}</small>}
        </div>

        <div className="mb-3">
          <label>Datum rođenja</label>
          <input
            className="form-control"
            name="birth_date"
            type="date"
            value={form.birth_date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Pol</label>
          <select
            className="form-select"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Odaberite</option>
            <option value="muško">Muško</option>
            <option value="žensko">Žensko</option>
            <option value="ne želim">Ne želim da se izjasnim</option>
          </select>
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            name="newsletter"
            checked={form.newsletter}
            onChange={handleChange}
          />
          <label className="form-check-label">Želim da se prijavim na Newsletter</label>
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            name="accepted_terms"
            checked={form.accepted_terms}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Prihvatam Pravila programa i Politiku privatnosti
          </label>
          {errors.accepted_terms && <div className="text-danger">{errors.accepted_terms}</div>}
        </div>

        <button className="btn btn-success w-100 mt-3">Registruj se</button>        {/* Dodaj ostatak kao što već koristiš – bez promene logike, ali koristi handleChange */}
        <button className="btn btn-success w-100 mt-3">Registruj se</button>
      </form>
    </div>
  );
}

export default RegisterForm;


/* import React, { useState } from "react";
import { useSmartAuth } from "../context/SmartAuthContext";import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { user, isLoggedIn, login, logout, register, loading } = useSmartAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    birth_date: "",
    gender: "",
    newsletter: false,
    accepted_terms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.first_name) newErrors.first_name = "Ime je obavezno.";
    if (!form.last_name) newErrors.last_name = "Prezime je obavezno.";
    if (!form.email) newErrors.email = "Email je obavezan.";
    if (!form.password) newErrors.password = "Lozinka je obavezna.";
    if (form.password !== form.password_confirmation)
      newErrors.password_confirmation = "Lozinke se ne poklapaju.";
    if (!form.accepted_terms)
      newErrors.accepted_terms = "Morate prihvatiti uslove korišćenja.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    try {
      await register(form);
      navigate("/agro-shopp/home");
    } catch (err) {
      setErrors({ global: "Greška prilikom registracije." });
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Kreirajte nalog i učlanite se u Agro-shopp Smart program</h2>

      {errors.global && <div className="alert alert-danger">{errors.global}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Ime *</label>
            <input
              className="form-control"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
          </div>

          <div className="col-md-6 mb-3">
            <label>Prezime *</label>
            <input
              className="form-control"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
          </div>
        </div>

        <div className="mb-3">
          <label>Email *</label>
          <input
            className="form-control"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label>Lozinka *</label>
          <input
            className="form-control"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Potvrdi lozinku *</label>
          <input
            className="form-control"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            placeholder="Ponovite lozinku"
            value={form.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && <small className="text-danger">{errors.password_confirmation}</small>}
        </div>

        <div className="mb-3">
          <label>Datum rođenja</label>
          <input
            className="form-control"
            name="birth_date"
            type="date"
            value={form.birth_date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Pol</label>
          <select
            className="form-select"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Odaberite</option>
            <option value="muško">Muško</option>
            <option value="žensko">Žensko</option>
            <option value="ne želim">Ne želim da se izjasnim</option>
          </select>
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            name="newsletter"
            checked={form.newsletter}
            onChange={handleChange}
          />
          <label className="form-check-label">Želim da se prijavim na Newsletter</label>
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            name="accepted_terms"
            checked={form.accepted_terms}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Prihvatam Pravila programa i Politiku privatnosti
          </label>
          {errors.accepted_terms && <div className="text-danger">{errors.accepted_terms}</div>}
        </div>

        <button className="btn btn-success w-100 mt-3">Registruj se</button>
      </form>
    </div>
  );
}

export default RegisterForm;
 */