import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organisationId, setOrganisationId] = useState(1); // default org
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState(null);

  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // Fetch teams for dropdown
  useEffect(() => {
    axios.get("http://localhost:5000/api/teams", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTeams(res.data))
    .catch(err => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", {
        firstName,
        lastName,
        email,
        organisationId,
        teamId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/employees"); // redirect to employees list
    } catch (err) {
      console.log(err);
      alert("Error adding employee. Check console.");
    }
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <select value={teamId || ""} onChange={e => setTeamId(Number(e.target.value))}>
          <option value="">-- Assign Team (optional) --</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
