import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamForm = () => {
  const [name, setName] = useState("");
  const [organisationId, setOrganisationId] = useState(1); // default org

  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/teams", {
        name,
        organisationId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/teams"); // redirect to teams list
    } catch (err) {
      console.log(err);
      alert("Error adding team. Check console.");
    }
  };

  return (
    <div className="container">
      <h1>Add Team</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button type="submit">Add Team</button>
      </form>
    </div>
  );
};

export default TeamForm;
