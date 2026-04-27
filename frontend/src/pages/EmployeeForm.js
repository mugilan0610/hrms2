import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeForm = ({ employee, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    role: employee?.role || "Employee",
    teamId: employee?.teamId || "",
    organisationId: 1
  });
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/teams`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTeams(res.data))
    .catch(err => console.log(err));
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, teamId: formData.teamId ? Number(formData.teamId) : null };
      if (employee) {
        await axios.put(`${process.env.REACT_APP_API_URL}/employees/${employee.id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/employees`, payload, { headers: { Authorization: `Bearer ${token}` } });
      }
      onSuccess();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Error saving employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <input className="input-field" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input className="input-field" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input className="input-field" type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select className="input-field" name="role" value={formData.role} onChange={handleChange}>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Analyst">Analyst</option>
          <option value="Intern">Intern</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
      <div className="form-group">
        <label>Team</label>
        <select className="input-field" name="teamId" value={formData.teamId} onChange={handleChange}>
          <option value="">-- Assign Team (optional) --</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="btn-secondary" type="button" onClick={onCancel} disabled={loading}>Cancel</button>
        <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Employee'}</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
