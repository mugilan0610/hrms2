import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import { useToast } from "../hooks/useToast";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const { showToast, ToastContainer } = useToast();
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const fetchEmployees = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/employees`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setEmployees(res.data))
    .catch(err => {
      console.log(err);
      showToast("Failed to fetch employees", "error");
    });
  };

  useEffect(() => { fetchEmployees(); }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      showToast("Employee deleted successfully", "success");
      fetchEmployees();
    } catch (err) {
      console.log(err);
      showToast(err.response?.data?.error || "Error deleting employee", "error");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === false ? 'Active' : 'Inactive';
      await axios.patch(`${process.env.REACT_APP_API_URL}/employees/${id}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      showToast(`Status updated to ${newStatus}`, "success");
      fetchEmployees();
    } catch (err) {
      console.log(err);
      showToast(err.response?.data?.error || "Error updating status", "error");
    }
  };

  const openAddModal = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  const openEditModal = (emp) => {
    setEditingEmployee(emp);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleFormSuccess = () => {
    showToast(editingEmployee ? "Employee updated successfully" : "Employee created successfully", "success");
    closeModal();
    fetchEmployees();
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchTerm.toLowerCase()) || 
                            emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole ? emp.role === filterRole : true;
      let matchesStatus = true;
      if (filterStatus === "Active") matchesStatus = emp.active !== false;
      if (filterStatus === "Inactive") matchesStatus = emp.active === false;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, searchTerm, filterRole, filterStatus]);

  return (
    <div className="dashboard-layout">
      <ToastContainer />
      <aside className="sidebar">
        <div className="sidebar-logo">HRMS</div>
        <Link className="nav-item active" to="/employees">Employees</Link>
        <Link className="nav-item" to="/teams">Teams</Link>
        <button className="nav-item" onClick={handleLogoutClick}>Logout</button>
      </aside>
      <main className="main-content">
        <div className="page-header">
          <h2>Employees</h2>
          <button className="btn-primary" style={{width:'auto',padding:'0.6rem 1.4rem'}} onClick={openAddModal}>Add employee</button>
        </div>
        
        <div className="data-card" style={{ marginBottom: '20px', padding: '15px', display: 'flex', gap: '15px', background: 'var(--color-bg-card)' }}>
          <input 
            className="input-field" 
            style={{ flex: 1 }} 
            placeholder="Search by name or email..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select className="input-field" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Analyst">Analyst</option>
            <option value="Intern">Intern</option>
            <option value="Employee">Employee</option>
          </select>
          <select className="input-field" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="data-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.firstName} {emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>
                    <button 
                      onClick={() => toggleStatus(emp.id, emp.active)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                    >
                      <span className={`badge ${emp.active !== false ? 'badge-active' : 'badge-inactive'}`}>
                        {emp.active !== false ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => openEditModal(emp)}>Edit</button>
                    <button className="action-btn" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingEmployee ? 'Edit employee' : 'Add employee'}</h3>
                <button className="action-btn" onClick={closeModal}>✕</button>
              </div>
              <EmployeeForm 
                employee={editingEmployee} 
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

export default Employees;
