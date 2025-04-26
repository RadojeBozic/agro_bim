import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../helpers/apiMarket";
import { Link } from "react-router-dom";

function Market() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => {
      const onlyFeatured = res.data.filter(p => p.is_featured);
      setFeatured(onlyFeatured);
    });
  }, []);

  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4 text-center">🎯 Izdvojeni proizvodi</h2>
        {featured.length === 0 ? (
          <p className="text-center">Trenutno nema istaknutih proizvoda.</p>
        ) : (
          <div className="row">
            {featured.map(product => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://127.0.0.1:8000/storage/${product.image}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p>{product.description}</p>
                    <p className="fw-bold text-success">{product.price} RSD</p>
                    <Link to={`/agro-shopp/products/${product.id}`} className="btn btn-sm btn-outline-success">
                      Pogledaj proizvod
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-5">
          <Link
            to="/agro-shopp/products"
            className="btn btn-lg btn-warning animate__animated animate__pulse animate__infinite"
          >
            🛒 Pogledaj sve proizvode
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Market;
