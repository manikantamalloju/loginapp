// AppRoutes.js
import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router";

const DashboardPage = React.lazy(() => import("./pages/dashboard/Dashboard"));
const LoginPage = React.lazy(() => import("./pages/Auth/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* Uncomment the line below if you want to redirect to login for unknown routes */}
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
}

function PrivateRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function AppRoutes() {
  const token = localStorage.getItem("token"); // Replace with your localStorage hook
  console.log("🚀 ~ token:", token);

  return token ? <PrivateRoutes /> : <PublicRoutes />;
}

export default AppRoutes;
