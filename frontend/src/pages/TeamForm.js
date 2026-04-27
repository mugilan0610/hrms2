import { useState } from "react";
import axios from "axios";

const TeamForm = ({ team, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: team?.name || "",
    department: team?.department || "",
    manager: team?.manager || "",
    organisationId: 1
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("jwt");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (team) {
        await axios.put(`${process.env.REACT_APP_API_URL}/teams/${team.id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/teams`, formData, { headers: { Authorization: `Bearer ${token}` } });
      }
      onSuccess();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Error saving team.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Team Name</label>
        <input className="input-field" type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input className="input-field" type="text" name="department" value={formData.department} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Manager</label>
        <input className="input-field" type="text" name="manager" value={formData.manager} onChange={handleChange} />
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="btn-secondary" type="button" onClick={onCancel} disabled={loading}>Cancel</button>
        <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Team'}</button>
      </div>
    </form>
  );
};

export default TeamForm;
