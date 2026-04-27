import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setLoading(true);
    try {
      // Note: backend expects organisationId, sending a default one for now
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        organisationId: 1 // Default organisation
      });
      alert('Registration successful! Please sign in.');
      navigate('/login');
    } catch (err) {
      setApiError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="subtitle">Join HRMS to manage your workforce</p>
        
        {apiError && <div className="alert alert-error">{apiError}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              className="input-field" 
              type="text" 
              name="name"
              placeholder="John Doe" 
              value={formData.name} 
              onChange={handleChange} 
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              className="input-field" 
              type="email" 
              name="email"
              placeholder="you@company.com" 
              value={formData.email} 
              onChange={handleChange} 
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              className="input-field" 
              type="password" 
              name="password"
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              className="input-field" 
              type="password" 
              name="confirmPassword"
              placeholder="••••••••" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
          </div>
          
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
