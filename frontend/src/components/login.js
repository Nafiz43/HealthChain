import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/app.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    publicKey: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const location = useLocation();
  let msg;
  let pubKey;
  if (location.state) {
    msg = location.state.message;
    pubKey = location.state.publicKey;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader
  
    // Simulate a delay before making the request (5 seconds)
    setTimeout(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        setMessage(data.message);
  
        if (response.status === 201) {
          const navigateTo = {
            Patient: '/patient_index',
            Doctor: '/doctor_index',
            Admin: '/admin_index',
          }[data.role];
  
          if (navigateTo) {
            navigate(navigateTo, {
              state: {
                message: data.message,
                publicKey: data.publicKey,
                username: data.username,
                secretKey: data.secKey,
                role: data.role,
              },
            });
          } else {
            alert('Unknown error');
          }
        } else {
          setMessage('Incorrect Username or Password');
        }
      } catch (error) {
        setMessage('Incorrect Username or Password');
      } finally {
        setLoading(false); // Stop the loader after request is completed
      }
    }, 10000); // Delay for 5 seconds
  };
  

  return (
    <div className="login-container">
      {msg && pubKey && (
        <div>
          <h3>{msg}</h3>
          <h3>Your public key is: {pubKey}</h3>
        </div>
      )}
      <nav className="navbar">
        <div className="navbar-brand">EduHealthChain</div>
      </nav>
      <div className="login-form">
        <center>
          <h2>Login</h2>
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="publicKey">Public Key:</label>
            <input
              type="text"
              id="publicKey"
              name="publicKey"
              value={formData.publicKey}
              onChange={handleChange}
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
              required
            />
          </div>
          <div
            className="form-group"
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: '4%',
            }}
          >
            <button className="button_login" type="submit">
              Login
            </button>
          </div>
        </form>
        <p>{message}</p>
      </div>
      {loading && ( // Loader overlay
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
