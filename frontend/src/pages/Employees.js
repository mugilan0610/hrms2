import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("jwt");

  const fetchEmployees = () => {
    axios.get("http://localhost:5000/api/employees", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setEmployees(res.data))
    .catch(err => console.log(err));
  };

  useEffect(() => { fetchEmployees(); }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await axios.delete(`http://localhost:5000/api/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchEmployees();
  };

  return (
    <div>
      <h1>Employees</h1>
      <Link to="/employee-form">Add Employee</Link>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.firstName} {emp.lastName} (Team ID: {emp.teamId})
            <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
