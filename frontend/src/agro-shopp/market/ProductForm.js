import React, { useState } from "react";
import Layout from "../components/Layout";
import API from "../../helpers/authSmart";


function ProductForm({ onAddProduct }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await API.post("/products", product);
      alert("✅ Proizvod dodat u bazu!");
  
      onAddProduct(res.data.product); // pošalji backend podatke ka roditeljskoj komponenti
  
      setProduct({ name: "", description: "", price: "", image: "" });
    } catch (err) {
      alert("❌ Greška pri slanju proizvoda.");
      console.error(err);
    }
  };
  

  return (
    <Layout>
      <div className="container mt-5">
        <h4>Dodaj test proizvod</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Naziv"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              placeholder="Opis"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="Cena"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="image"
              placeholder="URL slike (opciono)"
              value={product.image}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success">Dodaj</button>
        </form>
      </div>
    </Layout>
  );
}

export default ProductForm;
