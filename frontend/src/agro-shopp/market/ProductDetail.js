import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../../helpers/apiMarket";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Greška:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Layout><p>Učitavanje proizvoda...</p></Layout>;

  if (!product) {
    return (
      <Layout>
        <div className="container mt-5 text-center">
          <h4>Proizvod nije pronađen.</h4>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-5" style={{ maxWidth: "800px" }}>
        <div className="row">
          <div className="col-md-6">
            <img
              src={`http://127.0.0.1:8000/storage/${product.image}`}
              alt={product.name}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="fw-bold text-success fs-4">{product.price} RSD</p>

            <button className="btn btn-primary">🛒 Dodaj u korpu</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
