import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    axios.get("http://localhost:5000/api/teams", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTeams(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Teams</h1>
      <Link to="/team-form">Add Team</Link>
      <ul>
        {teams.map(team => (
          <li key={team.id}>{team.name} (Org ID: {team.organisationId})</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
