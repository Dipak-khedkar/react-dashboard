import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import UserPage from "./pages/UserPage";
import ProductsData from "./pages/ProductsData";
import OrdersPage from "./pages/OrdersPage";
import SalePage from "./pages/SalesPage";
import CovidChartsPage from "./pages/CovidChartsPage ";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/products" element={<ProductsData />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/covidtrack" element={<CovidChartsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
