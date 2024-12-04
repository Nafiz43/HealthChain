import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Doctor',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Track loader state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    // Simulate a delay for the request (30 seconds)
    setTimeout(async () => {
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

        if (response.ok) {
          navigate('/login', {
            state: { message: data.message, publicKey: data.publicKey },
          });
        }
      } catch (error) {
        setMessage('Sign Up Error! User already exists in the system!');
      } finally {
        setLoading(false); // Hide loader
      }
    }, 10000); // 30-second delay
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="navbar-brand">EduHealthChain</div>
      </nav>
      <div className="signup-form">
        <center>
          <h2>Signup</h2>
        </center>
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
              disabled={loading}
              style={{
                backgroundColor: loading ? '#d3d3d3' : '#007bff',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p>{message}</p>
      </div>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Signup;
