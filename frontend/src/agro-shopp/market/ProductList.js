import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSmartAuth } from "../../context/SmartAuthContext";
import API from "../../helpers/apiMarket";
import { Link, useSearchParams } from "react-router-dom";
import Snackbar from "../../components/Snackbar";

function ProductList() {
  const { user, isLoggedIn, loading } = useSmartAuth();

  // Lista proizvoda
  const [products, setProducts] = useState([]);

  // Aktivna kategorija (za prikaz u naslovu)
  const [activeCategory, setActiveCategory] = useState(null);

  // Učitavanje proizvoda
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Za prikaz snackbar poruka
  const [snackbar, setSnackbar] = useState({ message: "", type: "success" });

  // Čitanje query parametara iz URL-a (npr. ?category=12)
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  // Pretraga proizvoda
  const searchQuery = searchParams.get("search");



  /**
   * Dohvata proizvode i naziv rubrike (ako je izabrana)
   */
  useEffect(() => {
    if (!isLoggedIn) return;
  
    let url = "/products";
  
    const queryParts = [];
  
    if (searchQuery) queryParts.push(`search=${encodeURIComponent(searchQuery)}`);
    if (categoryId) queryParts.push(`category=${categoryId}`);
  
    if (queryParts.length > 0) {
      url += "?" + queryParts.join("&");
    }
  
    API.get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Greška:", err);
        setSnackbar({ message: "Greška pri učitavanju proizvoda.", type: "danger" });
      })
      .finally(() => setLoadingProducts(false));
  
    if (categoryId) {
      API.get("/categories").then(res => {
        const found = res.data
          .flatMap(parent => parent.children)
          .find(child => child.id === parseInt(categoryId));
        setActiveCategory(found?.name || null);
      });
    } else {
      setActiveCategory(null);
    }
  
  }, [isLoggedIn, searchQuery, categoryId]);
  

  /**
   * Briše proizvod
   */
  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete ovaj proizvod?")) return;

    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSnackbar({ message: "Proizvod je uspešno obrisan.", type: "success" });
    } catch (err) {
      console.error("Greška pri brisanju:", err);
      setSnackbar({ message: "Greška pri brisanju proizvoda.", type: "danger" });
    }
  };

  /**
   * Ističe proizvod na početnu stranicu (ili uklanja)
   */
  const handleFeature = async (id) => {
    try {
      const res = await API.put(`/products/${id}/feature`);
      const updated = res.data.product;

      // Ažuriramo lokalni state
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_featured: updated.is_featured } : p))
      );
    } catch (err) {
      console.error("Greška pri isticanju:", err);
    }
  };

  // Prikaz dok se proverava login status
  if (loading) return <Layout><p className="text-center mt-5">🔄 Provera korisnika...</p></Layout>;

  // Ako korisnik nije prijavljen
  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container mt-5 text-center">
          <h4>⛔ Prijava je neophodna za prikaz proizvoda.</h4>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-4">
        {/* Naslov stranice sa dodatkom kategorije ako postoji */}
        {/* <h2 className="mb-4 text-center">
          🛒 Agro-shopp proizvodi
          {activeCategory && <> – <span className="text-primary">{activeCategory}</span></>}
        </h2> */}
        <h2 className="mb-4 text-center">
          🛒 Agro-shopp proizvodi
          {activeCategory && <> – <span className="text-primary">{activeCategory}</span></>}
          {searchQuery && !activeCategory && (
            <> – <span className="text-info">Rezultati za: "{searchQuery}"</span></>
          )}
        </h2>


        {/* Učitavanje ili poruka o praznoj listi */}
        {loadingProducts ? (
          <p className="text-center">Učitavanje proizvoda...</p>
        ) : products.length === 0 ? (
          <p className="text-center">📭 Trenutno nema proizvoda za prikaz.</p>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100 shadow-sm">
                  {/* Slika proizvoda */}
                  {product.image && (
                    <img
                      src={`http://127.0.0.1:8000/storage/${product.image}`}
                      alt={product.name}
                      className="card-img-top"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/agro-shopp/products/${product.id}`}>{product.name}</Link>
                    </h5>
                    <p className="card-text">{product.description}</p>
                    <p className="fw-bold text-success">{product.price} RSD</p>

                    {/* Admin opcije */}
                    {user?.role === "admin" && (
                      <div className="mt-3 d-flex flex-wrap gap-2">
                        <Link
                          to={`/agro-shopp/products/${product.id}/edit`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Uredi
                        </Link>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Obriši
                        </button>

                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => handleFeature(product.id)}
                        >
                          {product.is_featured ? "Ukloni sa prve strane" : "Istakni"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Snackbar notifikacija */}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ message: "", type: "success" })}
      />
    </Layout>
  );
}

export default ProductList;
