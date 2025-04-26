import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddGazdinstvo from "./pages/AddGazdinstvo";
import GazdinstvaList from "./pages/GazdinstvaList";
import DokumentiUpload from "./pages/DokumentiUpload";
import Profil from "./pages/Profil";
import Subvencije from "./pages/Subvencije";
import Blog from "./pages/Blog";
import Saveti from "./pages/Saveti";
import Market from "./pages/Market";
import KorisniLinkovi from "./pages/KorisniLinkovi";
import Pravna from "./pages/Pravna";
import Kontakt from "./pages/Kontakt";
import AdminOnlyRoute from "./components/AdminOnlyRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import LoginForm from './agro-shopp/auth/LoginForm';
import RegisterForm from './agro-shopp/auth/RegisterForm';
import MarketHome from './agro-shopp/market/MarketHome';
import ProtectedRoute from "./components/ProtectedRoute";
import ProductList from "./agro-shopp/market/ProductList";
import AddProduct from './agro-shopp/market/AddProduct';
import ProductDetail from "./agro-shopp/market/ProductDetail";
import EditProduct from './agro-shopp/market/EditProduct';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gazdinstvo/dodaj" element={<AddGazdinstvo />} />
        <Route path="/gazdinstva" element={<GazdinstvaList />} />
        <Route path="/dokumenti" element={<DokumentiUpload />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/subvencije" element={<Subvencije />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/saveti" element={<Saveti />} />
        <Route path="/market" element={<Market />} />
        <Route path="/korisni-linkovi" element={<KorisniLinkovi />} />
        <Route path="/pravna" element={<Pravna />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/agro-shopp/login" element={<LoginForm />} />
        <Route path="/agro-shopp/register" element={<RegisterForm />} />
        <Route path="/agro-shopp/home" element={<MarketHome />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin" element={
            <AdminOnlyRoute>
              <AdminDashboard />
            </AdminOnlyRoute>
          } />
        <Route path="/admin/korisnici" element={<AdminOnlyRoute><AdminUsers /></AdminOnlyRoute>} />
        {/* Zaštićena ruta */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route
          path="/agro-shopp/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agro-shopp/add-product"
          element={
            <ProtectedRoute requireRole="admin">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/agro-shopp/products/:id" element={<ProductDetail />} />
        <Route
          path="/agro-shopp/products/:id/edit"
          element={
            <ProtectedRoute requireRole="admin">
              <EditProduct />
            </ProtectedRoute>
          }
        />    
      </Routes>
    </Router>
  );
}

export default App;
