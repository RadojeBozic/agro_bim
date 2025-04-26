import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../../helpers/apiMarket";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category_id: "",
  });

  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState([]);

  /**
   * Dohvati sve kategorije za dropdown
   */
  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
  }, []);

  /**
   * Dohvati podatke proizvoda koji se uređuje
   */
  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct({
          name: data.name,
          description: data.description,
          price: data.price,
          image: null,
          category_id: data.category_id || "",
        });
        setPreview(`http://127.0.0.1:8000/storage/${data.image}`);
      })
      .catch(() => alert("❌ Proizvod nije pronađen."));
  }, [id]);

  /**
   * Obrada promena u formi (tekst ili fajl)
   */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setProduct({ ...product, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  /**
   * Slanje forme za ažuriranje proizvoda
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.category_id) {
      alert("⚠️ Izaberite kategoriju.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category_id", product.category_id);

    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      await API.post(`/products/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Proizvod uspešno ažuriran.");
      navigate("/agro-shopp/products");
    } catch (err) {
      console.error("Greška pri ažuriranju:", err.response?.data || err.message);
      alert("❌ Došlo je do greške pri čuvanju.");
    }
  };

  return (
    <Layout>
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <h4 className="mb-4">Uredi proizvod</h4>

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
            placeholder="Cena"
            value={product.price}
            onChange={handleChange}
            required
          />

          {/* Kategorije (optgroup) */}
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

          {/* Slika (upload) */}
          <input
            name="image"
            type="file"
            className="form-control mb-3"
            onChange={handleChange}
          />

          {preview && (
            <div className="mb-3 text-center">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          )}

          <button className="btn btn-primary w-100">💾 Sačuvaj izmene</button>
        </form>
      </div>
    </Layout>
  );
}

export default EditProduct;
