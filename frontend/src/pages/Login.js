import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);

        const user = res.data.user;
        console.log("Ulogovani korisnik:", user);
        if (user.role === "admin" || user.role === "superadmin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

    } catch (err) {
      setError(err.response?.data?.message || "Greška prilikom prijave.");
    }
  };

  return (
    <div>
      <h2>Prijava</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Lozinka"
          value={form.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Prijava</button>
      </form>
    </div>
  );
  
}




export default Login;
