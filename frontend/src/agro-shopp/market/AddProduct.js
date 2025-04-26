import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../../helpers/apiMarket";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category_id: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Greška pri učitavanju kategorija:", err));
  }, []);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setProduct({
      ...product,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category_id", product.category_id);
    formData.append("image", product.image);

    try {
      const res = await API.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Proizvod dodat!");
      console.log("📦 Backend:", res.data);

      setProduct({
        name: "",
        description: "",
        price: "",
        image: null,
        category_id: "",
      });
    } catch (err) {
      console.error("📛 Backend greška:", err.response?.data || err.message);
      alert("❌ Greška pri unosu proizvoda.");
    }
  };

  return (
    <Layout>
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h4 className="mb-4">Dodaj novi proizvod</h4>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            className="form-control mb-3"
            placeholder="Naziv"
            value={product.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="Opis"
            value={product.description}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            className="form-control mb-3"
            placeholder="Cena (RSD)"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            name="image"
            type="file"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <select
            name="category_id"
            className="form-select mb-3"
            value={product.category_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Izaberi kategoriju --</option>
            {categories.map((parent) => (
              <optgroup key={parent.id} label={parent.name}>
                {parent.children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <button className="btn btn-success w-100">Sačuvaj</button>
        </form>
      </div>
    </Layout>
  );
}

export default AddProduct;
