import React, { useEffect, useState } from 'react';
import Signup from './components/signup'; // Corrected import
import Login from './components/login';   // Corrected import
import Patient_index from './components/patient_index';
import Doctor_index from './components/doctor_index';
import Admin_index from './components/admin_index';

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './styles/app.css';  // Import the CSS for styling

function App() {
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);  // Manage whether to show Login or Signup form

  useEffect(() => {
    fetch('http://localhost:5050') // Backend running on port 5050
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);  // Toggle between Login and Signup form
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/patient_index" element={<Patient_index/>} />
          <Route path="/doctor_index" element={<Doctor_index/>} />
          <Route path="/admin_index" element={<Admin_index/>} />
        </Routes>

         {/* Conditional rendering of Login or Signup */}
      <button onClick={toggleForm}>
        {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
      </button>
      {isLogin ? <Login /> : <Signup />}

      </div>
    </Router>
  );
  // return (
  //   <div className="App">
  //     {/* Conditional rendering of Login or Signup */}
  //     <button onClick={toggleForm}>
  //       {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
  //     </button>
  //     {isLogin ? <Login /> : <Signup />}
  //   </div>
  // );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* <button onClick={() => navigate('/signup')}>Need an account? Signup</button>
      <button onClick={() => navigate('/login')}>Already have an account? Login</button>
      <Signup /> */}
    </div>
  );
}


export default App;




// import React from 'react';
// import PatientIndex from './components/admin_index'; // Import Patient Dashboard component
// import './styles/app.css';  // Import the CSS for styling

// function App() {
//   return (
//     <Router>
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Login />} />
//       </Routes>
//     </div>
//   </Router>

  
//     <div className="App">
//       {/* Directly render the PatientIndex component */}
//       <PatientIndex />
//     </div>
//   );
// }

// export default App;
