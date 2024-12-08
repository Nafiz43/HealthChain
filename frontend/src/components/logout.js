// src/components/Login.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { useLocation,useNavigate } from 'react-router-dom';
import '../styles/app.css'; // Import the CSS file



const Logout = () => {
const navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     publicKey: '',
//   });

  const [message, setMessage] = useState('');
//   const location = useLocation();
//   let msg;
//   let pubKey;
//   if(location.state) {
//     msg = location.state.message ;
//     pubKey = location.state.publicKey;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to backend
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
      if(response.ok)
      {
        navigate('/')
        window.location.reload();

      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <button onClick={handleSubmit} className="logout-button">Logout</button>

  );
};

export default Logout;
