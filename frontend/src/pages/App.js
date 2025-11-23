import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterOrganisation from "./pages/RegisterOrganisation";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
import EmployeeForm from "./pages/EmployeeForm";
import TeamForm from "./pages/TeamForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterOrganisation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="/team-form" element={<TeamForm />} />
      </Routes>
    </Router>
  );
}

export default App;
