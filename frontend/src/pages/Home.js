import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <div className="container text-white text-center py-5">
        <h1 className="display-4 fw-bold">Dobrodošli na AGRO BiM</h1>
        <p className="lead">
          Vaš digitalni partner u procesu dobijanja subvencija u poljoprivredi.
        </p>
        <Link to="#subvencije" className="btn btn-warning btn-lg mt-3">
          Saznaj više
        </Link>
      </div>

      <div className="bg-white text-dark py-5">
        <div className="container">
          <h2 className="mb-4 text-success" id="subvencije">Vrste subvencija u poljoprivredi</h2>

          <div className="mb-4">
            <h5>1. Direktna plaćanja (po hektaru ili grlu)</h5>
            <ul>
              <li>✅ Do 18.000 dinara po hektaru (ratarske, povrtarske, voćarske kulture)</li>
              <li>✅ Do 40.000 dinara po kravi za mleko i priplodna grla</li>
              <li>✅ Subvencije za ovce, svinje, koze, pčele itd.</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5>2. Investicije u fizičku imovinu</h5>
            <ul>
              <li>✅ Nabavka mehanizacije, traktora, priključaka</li>
              <li>✅ Višegodišnji zasadi, navodnjavanje, plastenici</li>
              <li>✅ Oprema za pakovanje i preradu</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5>3. Ruralni razvoj</h5>
            <ul>
              <li>✅ Mladi poljoprivrednici (do 40 godina)</li>
              <li>✅ Seoski turizam i dodatne aktivnosti</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5>4. IPARD program (EU podrška)</h5>
            <ul>
              <li>✅ Investicije u farme, preradu, opremu</li>
              <li>✅ Sufinansiranje do 60–70% od strane EU</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5>Ko ima pravo na subvencije?</h5>
            <ul>
              <li>✅ Registrovana aktivna gazdinstva</li>
              <li>✅ Fizička i pravna lica, zadruge</li>
              <li>✅ Mladi, žene, početnici (posebni konkursi)</li>
            </ul>
          </div>

          <hr className="my-5" />

          <h3 className="mb-4 text-success">Istraži još:</h3>
          <div className="row g-4">
            {[
              ["Blog", "/blog"],
              ["Saveti stručnjaka", "/saveti"],
              ["Market", "/market"],
              ["Korisni linkovi", "/korisni-linkovi"],
              ["Pravna regulativa", "/pravna"],
              ["Kontakt", "/kontakt"],
            ].map(([title, path]) => (
              <div className="col-md-4" key={title}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Saznaj više o: {title.toLowerCase()}.</p>
                    <Link to={path} className="btn btn-outline-success btn-sm">
                      Detaljnije
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
