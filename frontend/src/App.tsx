// import React, { useEffect, useState } from 'react';
// import Signup from './components/signup'; // Corrected import
// import Login from './components/login';   // Corrected import
// import './styles/app.css';  // Import the CSS for styling

// function App() {
//   const [message, setMessage] = useState('');
//   const [isLogin, setIsLogin] = useState(true);  // Manage whether to show Login or Signup form

//   useEffect(() => {
//     fetch('http://localhost:5050') // Backend running on port 5050
//       .then(response => response.text())
//       .then(data => setMessage(data));
//   }, []);

//   const toggleForm = () => {
//     setIsLogin(!isLogin);  // Toggle between Login and Signup form
//   };

//   return (
//     <div className="App">
//       {/* Conditional rendering of Login or Signup */}
//       <button onClick={toggleForm}>
//         {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
//       </button>
//       {isLogin ? <Login /> : <Signup />}
//     </div>
//   );
// }

// export default App;


import React from 'react';
import PatientIndex from './components/admin_index'; // Import Patient Dashboard component
import './styles/app.css';  // Import the CSS for styling

function App() {
  return (
    <div className="App">
      {/* Directly render the PatientIndex component */}
      <PatientIndex />
    </div>
  );
}

export default App;
