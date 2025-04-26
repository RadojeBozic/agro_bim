import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function AdminOnlyRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [dozvoljeno, setDozvoljeno] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    API.get("/user")
      .then(res => {
        const role = res.data.role;
        if (role === "admin" || role === "superadmin") {
          setDozvoljeno(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Učitavanje...</p>;

  return dozvoljeno ? children : <Navigate to="/dashboard" />;
}

export default AdminOnlyRoute;
