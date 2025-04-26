import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import API from "../../helpers/apiMarket";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/categories-with-count").then(res => setCategories(res.data));
  }, []);

  return (
    <div className="layout">
      <Navbar />
      <div className="main-content d-flex">
        <aside className="left-sidebar p-3 border-end" style={{ width: '20%' }}>
          <h5 className="mb-3">🧩 Rubrike</h5>
          <ul className="list-unstyled">
            {categories.map((parent) => (
              <li key={parent.id}>
                <strong className="text-dark">{parent.name}</strong>
                <ul className="list-unstyled ms-2 mt-1">
                  {parent.children.map((child) => (
                    <li key={child.id} className="mb-2">
                      <button
                        className="btn btn-sm btn-outline-success w-100 text-start d-flex justify-content-between align-items-center"
                        onClick={() => navigate(`/agro-shopp/products?category=${child.id}`)}
                      >
                        <span>{child.name}</span>
                        <span className="badge bg-secondary">{child.products_count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>

        <main className="content-area p-4" style={{ width: '60%' }}>
          {children}
        </main>

        <aside className="right-ads p-3 border-start" style={{ width: '20%' }}>
          <h6>Reklame</h6>
          <div style={{ background: '#eee', height: '150px' }}>[Google oglas]</div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
