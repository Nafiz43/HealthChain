// src/components/Signup.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../styles/app.css'; // Import the CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Doctor', // Added default role
  });

  const [message, setMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track button state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsButtonDisabled(true); // Disable button immediately upon click

    // Send POST request to backend
    try {
      const response = await fetch('http://localhost:5050/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Sign Up Error');
    }
  };

  return (
    <div className="login-container">
    <nav className="navbar"><div className="navbar-brand">EduHealthChain</div></nav>
      <div className="card" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control"
              >
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isButtonDisabled}
                style={{
                  backgroundColor: isButtonDisabled ? '#d3d3d3' : '#007bff',
                  cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                {isButtonDisabled ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
          <p className="text-center mt-3">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
