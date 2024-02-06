// AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const DashboardPage = React.lazy(() => import("./pages/dashboard/Dashboard"));
const LoginPage = React.lazy(() => import("./pages/Auth/Login"));

function AppRoutes() {
  const token = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={token ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
