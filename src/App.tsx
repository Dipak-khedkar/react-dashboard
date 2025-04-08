import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SettingPage from "./pages/SettingPage";
import ProductsList from "./pages/ProductsList";
import DashBoard from "./pages/DashBoard";
import OrdersPage from "./pages/OrdersPage";
import Analytics from "./pages/Analytics";
import Help from "./pages/Help";
import UsersPage from "./pages/UsersPage";
import CreateUser from "./pages/CreateUser";
import SignupPage from "./pages/SignupPage";
import AuthPage from "./pages/AuthPage";
import PublicRoutes from "./components/auth/PublicRoutes";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<AuthPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<DashBoard />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
