import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

const AppLayout: React.FC = () => {
  return (
    <div>
      {" "}
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
