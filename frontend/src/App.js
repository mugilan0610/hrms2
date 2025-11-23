import React, { useState, useEffect } from "react";
import './App.css'

const API = "http://localhost:5000/api";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYzOTE1NDgzfQ.6Ete2js4k_1f80wbvV2BYadIfZK5EdEhkG6VjuRtcoo";

function App() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ firstName: "", lastName: "", email: "", organisationId: 1 });
  const [newTeam, setNewTeam] = useState({ name: "", organisationId: 1 });
  const [assign, setAssign] = useState({ employeeId: "", teamId: "" });

  useEffect(() => {
    fetchEmployees();
    fetchTeams();
  }, []);

  const fetchEmployees = async () => {
    const res = await fetch(`${API}/employees`, { headers: { Authorization: TOKEN } });
    const data = await res.json();
    setEmployees(data);
  };

  const fetchTeams = async () => {
    const res = await fetch(`${API}/teams`, { headers: { Authorization: TOKEN } });
    const data = await res.json();
    setTeams(data);
  };

  const addEmployee = async () => {
    await fetch(`${API}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: TOKEN },
      body: JSON.stringify(newEmployee),
    });
    fetchEmployees();
    setNewEmployee({ firstName: "", lastName: "", email: "", organisationId: 1 });
  };

  const addTeam = async () => {
    await fetch(`${API}/teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: TOKEN },
      body: JSON.stringify(newTeam),
    });
    fetchTeams();
    setNewTeam({ name: "", organisationId: 1 });
  };

  const assignEmployee = async () => {
    if (!assign.employeeId || !assign.teamId) return alert("Select employee & team");
    await fetch(`${API}/teams/${assign.teamId}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: TOKEN },
      body: JSON.stringify({ employeeIds: [parseInt(assign.employeeId)] }),
    });
    fetchEmployees();
    setAssign({ employeeId: "", teamId: "" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>HRMS Dashboard</h1>

      <h2>Employees</h2>
      <ul>
        {employees.length ? employees.map(e => <li key={e.id}>{e.firstName} {e.lastName} (Team ID: {e.teamId || "None"})</li>) : <li>No employees found.</li>}
      </ul>

      <h3>Add Employee</h3>
      <input placeholder="First Name" value={newEmployee.firstName} onChange={e => setNewEmployee({...newEmployee, firstName: e.target.value})} />
      <input placeholder="Last Name" value={newEmployee.lastName} onChange={e => setNewEmployee({...newEmployee, lastName: e.target.value})} />
      <input placeholder="Email" value={newEmployee.email} onChange={e => setNewEmployee({...newEmployee, email: e.target.value})} />
      <button onClick={addEmployee}>Add Employee</button>

      <h2>Teams</h2>
      <ul>
        {teams.length ? teams.map(t => <li key={t.id}>{t.name} (Organisation ID: {t.organisationId})</li>) : <li>No teams found.</li>}
      </ul>

      <h3>Add Team</h3>
      <input placeholder="Team Name" value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} />
      <button onClick={addTeam}>Add Team</button>

      <h3>Assign Employee to Team</h3>
      <select value={assign.employeeId} onChange={e => setAssign({...assign, employeeId: e.target.value})}>
        <option value="">Select Employee</option>
        {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
      </select>
      <select value={assign.teamId} onChange={e => setAssign({...assign, teamId: e.target.value})}>
        <option value="">Select Team</option>
        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
      <button onClick={assignEmployee}>Assign</button>
    </div>
  );
}

export default App;
