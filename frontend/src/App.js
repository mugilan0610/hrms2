import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
import "./App.css";

const PrivateRoute = () => {
  const token = localStorage.getItem("jwt");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/employees" element={<Employees />} />
          <Route path="/teams" element={<Teams />} />
        </Route>
        <Route path="/" element={<Navigate to="/employees" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
