import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <>
        <ToastContainer />
        <AppRoutes />
      </>
    </BrowserRouter>
  );
}

export default App;
