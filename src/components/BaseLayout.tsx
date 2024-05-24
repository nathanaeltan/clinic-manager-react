import Header from "./Header";
import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <SideBar />
      <div style={{ marginTop: 64, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
