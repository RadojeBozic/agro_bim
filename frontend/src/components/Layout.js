import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const bgImage = getBackgroundImage(location.pathname);
  const { title, icon } = getSectionData(location.pathname);

  return (
    <div className="d-flex">
      <Sidebar />
      <main
        className="flex-grow-1 position-relative"
        style={{
          minHeight: "100vh",
          background: `url('/images/${bgImage}') no-repeat center center / cover`,
          color: "#fff",
        }}
      >
        <div className="p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          {/* Hero naslov sa ikonicom */}
          {title && (
            <div className="mb-4 animate__animated animate__fadeInDown">
             <h1 className="display-5 d-flex align-items-center animate__animated animate__fadeInDown">
              <i className={`bi ${icon} me-3`}></i> {title}
            </h1>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

const getBackgroundImage = (pathname) => {
  switch (pathname) {
    case "/":
      return "agrobg1920x1280.jpg";
    case "/blog":
      return "agroBlog.jpg";
    case "/market":
      return "agroMarket.jpg";
    case "/profil":
      return "agroProfil.jpg";
    case "/saveti":
      return "agroSaveti.jpg";
    case "/pravna":
      return "agroPravna.jpg";
    case "/korisni-linkovi":
      return "agroLinks.jpg";
    case "/kontakt":
      return "agroContact.jpg";
    case "/subvencije":
      return "agroSubvencije.jpg";
    default:
      return "agrobg1920x1280.jpg";
  }
};

const getSectionData = (pathname) => {
  switch (pathname) {
    case "/":
      return { title: "Dobrodošli na AGRO BiM", icon: "bi-leaf" };
    case "/blog":
      return { title: "Blog", icon: "bi-pencil-square" };
    case "/market":
      return { title: "Market", icon: "bi-cart4" };
    case "/kontakt":
      return { title: "Kontaktiraj nas", icon: "bi-envelope" };
    case "/subvencije":
      return { title: "Subvencije u Srbiji", icon: "bi-bar-chart-line" };
    case "/profil":
      return { title: "Moj profil", icon: "bi-person-circle" };
    case "/saveti":
      return { title: "Saveti stručnjaka", icon: "bi-lightbulb" };
    case "/korisni-linkovi":
      return { title: "Korisni linkovi", icon: "bi-link-45deg" };
    case "/pravna":
      return { title: "Pravna regulativa", icon: "bi-file-earmark-text" };
    default:
      return { title: "", icon: "" };
  }
};


export default Layout;
