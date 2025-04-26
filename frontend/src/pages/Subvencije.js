import Layout from "../components/Layout";

function Subvencije() {
  return (
    <Layout>
      <div className="container">
        <h2 className="mb-4">Subvencije – Informacije</h2>
        <p>
          Ova sekcija će prikazivati aktuelne subvencije i podsticaje za poljoprivrednike u Srbiji.
        </p>
        <ul>
          <li>📌 Informacije o rokovima</li>
          <li>📌 Ko ima pravo na subvenciju</li>
          <li>📌 Kriterijumi i dokumentacija</li>
          <li>📌 Vesti iz sektora poljoprivrede</li>
        </ul>
        <p className="text-muted">* Sadržaj će biti automatski ažuriran kada povežemo sa internet izvorima.</p>
      </div>
    </Layout>
  );
}

export default Subvencije;
