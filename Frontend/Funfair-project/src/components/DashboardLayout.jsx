import React from "react";
import { Outlet } from "react-router-dom";
import Foot from "./Foot";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="app-page">
      <Navbar />

      <div className="page-wrap flex flex-col gap-6 py-6 md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <Foot />
    </div>
  );
};

export default DashboardLayout;
