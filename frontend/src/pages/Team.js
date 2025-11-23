import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const token = localStorage.getItem("jwt");

  const fetchTeams = () => {
    axios
      .get("http://localhost:5000/api/teams", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setTeams(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const deleteTeam = async (id) => {
    if (!window.confirm("Delete this team?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/teams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTeams();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Teams</h1>
      <Link to="/team-form">
        <button>Add Team</button>
      </Link>

      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div className="team-list">
          {teams.map(team => (
            <div key={team.id} className="card list-item">
              <div>
                <strong>{team.name}</strong>
                <p>Organisation ID: {team.organisationId}</p>
              </div>
              <button onClick={() => deleteTeam(team.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
