import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, marginTop: "80px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
