import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TeamForm from "./TeamForm";
import { useToast } from "../hooks/useToast";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const { showToast, ToastContainer } = useToast();
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const fetchTeams = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/teams`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTeams(res.data))
    .catch(err => {
      console.log(err);
      showToast("Failed to fetch teams", "error");
    });
  };

  useEffect(() => { fetchTeams(); }, []);

  const deleteTeam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/teams/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      showToast("Team deleted successfully", "success");
      fetchTeams();
    } catch (err) {
      console.log(err);
      showToast(err.response?.data?.error || "Error deleting team", "error");
    }
  };

  const openAddModal = () => {
    setEditingTeam(null);
    setShowModal(true);
  };

  const openEditModal = (team) => {
    setEditingTeam(team);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTeam(null);
  };

  const handleFormSuccess = () => {
    showToast(editingTeam ? "Team updated successfully" : "Team created successfully", "success");
    closeModal();
    fetchTeams();
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <ToastContainer />
      <aside className="sidebar">
        <div className="sidebar-logo">HRMS</div>
        <Link className="nav-item" to="/employees">Employees</Link>
        <Link className="nav-item active" to="/teams">Teams</Link>
        <button className="nav-item" onClick={handleLogoutClick}>Logout</button>
      </aside>
      <main className="main-content">
        <div className="page-header">
          <h2>Teams</h2>
          <button className="btn-primary" style={{width:'auto',padding:'0.6rem 1.4rem'}} onClick={openAddModal}>Add team</button>
        </div>
        <div className="data-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Department</th>
                <th>Manager</th>
                <th>Members count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(team => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>{team.department || '-'}</td>
                  <td>{team.manager || '-'}</td>
                  <td>
                    {team.memberCount > 0 ? (
                      team.memberCount + " members"
                    ) : (
                      <span style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>0 members</span>
                    )}
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => openEditModal(team)}>Edit</button>
                    <button className="action-btn" onClick={() => deleteTeam(team.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {teams.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No teams found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingTeam ? 'Edit team' : 'Add team'}</h3>
                <button className="action-btn" onClick={closeModal}>✕</button>
              </div>
              <TeamForm 
                team={editingTeam} 
                onSuccess={handleFormSuccess} 
                onCancel={closeModal} 
              />
            </div>
          </div>
        )}

        {showLogoutConfirm && (
          <div className="modal-overlay">
            <div className="modal-box" style={{ maxWidth: '350px', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '15px' }}>Confirm Logout</h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '25px' }}>Are you sure you want to sign out?</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-secondary" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
                <button className="btn-primary" onClick={confirmLogout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Teams;
