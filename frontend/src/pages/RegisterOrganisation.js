import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterOrganisation = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/organisations",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Organisation created!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h1>Register Organisation</h1>
      <input placeholder="Organisation Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleRegister}>Create</button>
    </div>
  );
};

export default RegisterOrganisation;
