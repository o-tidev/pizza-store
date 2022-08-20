import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
