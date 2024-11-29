// src/components/Login.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { useLocation,useNavigate } from 'react-router-dom';
import '../styles/app.css'; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    publicKey: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const location = useLocation();
  let msg;
  let pubKey;
  if(location.state) {
    msg = location.state.message ;
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

    // Send POST request to backend
    try {
      const response = await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
      console.log(data)

      if(data.role === "Patient"){
        navigate('/patient_index', { state: { message: data.message, publicKey: data.publicKey, username: data.username, secretKey: data.secKey } })

      }
      else if(data.role === "Doctor"){
          navigate('/doctor_index', { state: { message: data.message, publicKey: data.publicKey, username: data.username, secretKey: data.secKey } })
      }
      else{
        navigate('/admin_index', { state: { message: data.message, publicKey: data.publicKey, username: data.username, secretKey: data.secKey } })
      }
      

    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    
    <div className="login-container">
      {msg && pubKey && (
        <div>
          <h3>{msg}</h3>
          <h3>You public key is : {pubKey}</h3>
        </div>
      )}
      <nav className="navbar"><div className="navbar-brand">EduHealthChain</div></nav>
      <div className="login-form">
        <center><h2>Login</h2></center>
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
          <div className="form-group" style={{display: 'flex', justifyContent: 'center', paddingLeft: '4%'}}>
            <button className='button_login' type="submit">Login</button>
            </div>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;