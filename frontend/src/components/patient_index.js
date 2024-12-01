import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Logout  from './logout';
import { useLocation } from 'react-router-dom';

import '../styles/dashboard.css';

const PatientIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page
  const [appointments, setAppointments] = useState([]);
  const [medications, setMedications] = useState([]);

  const [message, setMessage] = useState('');

  const location = useLocation();
  let msg;
  let pubKey = location.state.publicKey;
  let username = location.state.username;
  let secKey = location.state.secretKey;
  console.log("LLL, ", location.state)
  console.log("ll ", pubKey)

  const handleNavigation = (page) => {
    setActivePage(page); // Change the active page
  };

   // Fetch Appointments
   const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:5050/PatientViewAppointments?publicKey=${pubKey}`);
      const data = await response.json();
      console.log("lllkl ",data)
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

    // Fetch Medications
    const fetchMedications = async () => {
      try {
        const response = await fetch(`http://localhost:5050/PatientViewMedications?publicKey=${pubKey}&username=${username}`);
        const data = await response.json();
        setMedications(data.medications || []);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    const handleBookAppointment = async (event, publicKey) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        date: formData.get('appointment-date'),
        time: formData.get('appointment-time'),
        doctor: formData.get('doctor-name'),
        reason: formData.get('appointment-reason'),
      };
      alert(formData.get('appointment-date'))
      console.log(pubKey)
      console.log(secKey)
      
      try {
        const response = await fetch(`http://localhost:5050/bookAppointment?publicKey=${pubKey}&secKey=${secKey}&username=${username}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        alert(result.message || 'Appointment booked successfully!');
      } catch (error) {
        alert('Error booking appointment: ' + error.message);
      }
    };


      // Update Profile API call
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('full-name'),
      dob: formData.get('dob'),
      ssn: formData.get('ssn'),
      phone: formData.get('phone-number'),
      email: formData.get('email'),
    };
    alert(formData.get('phone-number'))
    console.log(data)

    try {
      const response = await fetch(`http://localhost:5050/UpdateProfile?publicKey=${pubKey}&secKey=${secKey}&username=${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert(result.message || 'Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };




  let welcome = (
    <h2>Welcome to Patient Dashboard</h2>
  )

  let bookAppoinment = (
    <div>
      <h2>Fill up the following to Book Appointments</h2>
      <form className="appointment-form"  onSubmit={handleBookAppointment}>
        {/* Appointment Date */}
        <div className="form-group">
          <label htmlFor="appointment-date">Select an Appointment Date:</label>
          <input type="date" id="appointment-date" name="appointment-date" required />
        </div>
  
        {/* Appointment Time */}
        <div className="form-group">
          <label htmlFor="appointment-time">Select an Appointment Time:</label>
          <input type="time" id="appointment-time" name="appointment-time" required />
        </div>
  
        {/* Doctor Name */}
        <div className="form-group">
          <label htmlFor="doctor-name">Select Doctor Name:</label>
          <select id="doctor-name" name="doctor-name" required>
            <option value="" disabled selected>
              Choose a Doctor
            </option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Lee">Dr. Lee</option>
          </select>
        </div>
  
        {/* Reason for Appointment */}
        <div className="form-group">
          <label htmlFor="appointment-reason">Provide Reason for Appointment:</label>
          <textarea
            id="appointment-reason"
            name="appointment-reason"
            rows="4"
            placeholder="Enter the reason for your appointment"
            required
          ></textarea>
        </div>
  
        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Book Appointment
        </button>
      </form>
    </div>
  );

  let ViewAppointment = (
    <div style={{ marginLeft: '-30%' }}> 
        <button onClick={fetchAppointments}> View Appointments</button>

      <center><h2>Your Appointments</h2></center>
      {/* <h2>Your Appointments</h2> */}
      <table className="table table-striped" onClick={fetchAppointments} style={{ width: '160%' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>
          <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.status}</td>
                  </tr>
                ))}
          </tbody>
      </table>
    </div>
  );

  

  let viewMedication = (
    <div>
      <button onClick={fetchMedications}> View Medications</button>

      <center><h2>Medications</h2></center>
      <table className="table table-striped"  style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Prescribed Medicine</th>
            <th>Dosage Info</th>
            <th>Doctor Name</th>
            <th>Usage Guide</th>
          </tr>
        </thead>
          <tbody>
                {medications.map((medication, index) => (
                  <tr key={index}>
                    <td>{medication.date}</td>
                    <td>{medication.medicine}</td>
                    <td>{medication.dosage}</td>
                    <td>{medication.doctor}</td>
                    <td>{medication.usageGuide}</td>
                  </tr>
                ))}
          </tbody>
      </table>
    </div>
  );
  
  let updateProfile_ = (
    <div style={{ width: '60%' }}>
      <h2>Update Profile</h2>
      <form className="appointment-form"  onSubmit={handleUpdateProfile}>
        <div className="form-group" >
          <label htmlFor="full-name">Full Name</label>
          <input type="text" className="form-control" id="full-name" name='full-name' placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" className="form-control" id="dob" name="dob"/>
        </div>
        <div className="form-group">
          <label htmlFor="ssn">SSN</label>
          <input type="text" className="form-control" id="ssn" placeholder="Enter your SSN" name="ssn" />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" id="phone-number" name="phone-number" placeholder="Enter your phone number" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
  

  const renderContent = () => {
    // Render content based on active page
    switch (activePage) {
      case 'Dashboard':
        return welcome;
      case 'BookAppointments':
        console.log("pp ", pubKey)
        return bookAppoinment;
      case 'ViewAppointments':
        return ViewAppointment;
      case 'ViewMedications':
        return viewMedication;
      case 'UpdateProfile':
        return updateProfile_;
      default:
        return welcome;
    }
  };

  return (
    <div className="patient-dashboard">
      {/* Top Navigation Bar */}
      <div className="top-navbar">
        <div className="app-name">EduHealthChain</div>
          <Logout/>
      </div>
      
      {/* Main Content Section */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li className={activePage === 'Dashboard' ? 'active' : ''} onClick={() => handleNavigation('Dashboard')}>Dashboard</li>
            <li className={activePage === 'BookAppointments' ? 'active' : ''} onClick={() => handleNavigation('BookAppointments')}>Book Appointments</li>
            <li className={activePage === 'ViewAppointments' ? 'active' : ''} onClick={() => handleNavigation('ViewAppointments')}>View Appointments</li>
            <li className={activePage === 'ViewMedications' ? 'active' : ''} onClick={() => handleNavigation('ViewMedications')}>View Medications</li>
            <li className={activePage === 'UpdateProfile' ? 'active' : ''} onClick={() => handleNavigation('UpdateProfile')}>Update Profile</li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientIndex;



// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
// import Logout from './logout';
// import '../styles/dashboard.css';

// const PatientIndex = () => {
//   const [activePage, setActivePage] = useState('Dashboard'); // Default page
//   const [appointments, setAppointments] = useState([]);
//   const [medications, setMedications] = useState([]);

//   const handleNavigation = (page) => {
//     setActivePage(page);
//   };

//   // Book Appointment API call
//   const handleBookAppointment = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = {
//       date: formData.get('appointment-date'),
//       time: formData.get('appointment-time'),
//       doctor: formData.get('doctor-name'),
//       reason: formData.get('appointment-reason'),
//     };
//     alert(formData.get('appointment-date'))

//     try {
      
//       const response = await fetch('http://localhost:5050/bookAppointment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       const result = await response.json();
//       alert(result.message || 'Appointment booked successfully!');
//     } catch (error) {
//       alert('Error booking appointment: ' + error.message);
//     }
//   };

//   // Fetch Appointments
//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch('/api/viewAppointments');
//       const data = await response.json();
//       setAppointments(data.appointments || []);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     }
//   };

//   // Fetch Medications
//   const fetchMedications = async () => {
//     try {
//       const response = await fetch('/api/viewMedications');
//       const data = await response.json();
//       setMedications(data.medications || []);
//     } catch (error) {
//       console.error('Error fetching medications:', error);
//     }
//   };

//   // Update Profile API call
//   const handleUpdateProfile = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData);

//     try {
//       const response = await fetch('/api/updateProfile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       const result = await response.json();
//       alert(result.message || 'Profile updated successfully!');
//     } catch (error) {
//       alert('Error updating profile: ' + error.message);
//     }
//   };

//   useEffect(() => {
//     if (activePage === 'ViewAppointments') fetchAppointments();
//     if (activePage === 'ViewMedications') fetchMedications();
//   }, [activePage]);

//   const renderContent = () => {
//     switch (activePage) {
//       case 'Dashboard':
//         return <h2>Welcome to Patient Dashboard</h2>;
//       case 'BookAppointments':
//         return (
//           <div>
//             <h2>Fill up the following to Book Appointments</h2>
//             <form className="appointment-form" onSubmit={handleBookAppointment}>
//               <div className="form-group">
//                 <label htmlFor="appointment-date">Select an Appointment Date:</label>
//                 <input type="date" id="appointment-date" name="appointment-date" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="appointment-time">Select an Appointment Time:</label>
//                 <input type="time" id="appointment-time" name="appointment-time" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="doctor-name">Select Doctor Name:</label>
//                 <select id="doctor-name" name="doctor-name" required>
//                   <option value="" disabled selected>
//                     Choose a Doctor
//                   </option>
//                   <option value="Dr. Smith">Dr. Smith</option>
//                   <option value="Dr. Johnson">Dr. Johnson</option>
//                   <option value="Dr. Lee">Dr. Lee</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label htmlFor="appointment-reason">Provide Reason for Appointment:</label>
//                 <textarea
//                   id="appointment-reason"
//                   name="appointment-reason"
//                   rows="4"
//                   placeholder="Enter the reason for your appointment"
//                   required
//                 ></textarea>
//               </div>
//               <button type="submit" className="submit-button">
//                 Book Appointment
//               </button>
//             </form>
//           </div>
//         );
//       case 'ViewAppointments':
//         return (
//           <div>
//             <h2>Your Appointments</h2>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Doctor</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {appointments.map((appointment, index) => (
//                   <tr key={index}>
//                     <td>{appointment.date}</td>
//                     <td>{appointment.time}</td>
//                     <td>{appointment.doctor}</td>
//                     <td>{appointment.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         );
//       case 'ViewMedications':
//         return (
//           <div>
//             <h2>Medications</h2>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Prescribed Medicine</th>
//                   <th>Dosage Info</th>
//                   <th>Doctor Name</th>
//                   <th>Usage Guide</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {medications.map((medication, index) => (
//                   <tr key={index}>
//                     <td>{medication.date}</td>
//                     <td>{medication.medicine}</td>
//                     <td>{medication.dosage}</td>
//                     <td>{medication.doctor}</td>
//                     <td>{medication.usageGuide}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         );
//       case 'UpdateProfile':
//         return (
//           <div>
//             <h2>Update Profile</h2>
//             <form onSubmit={handleUpdateProfile}>
//               <div className="form-group">
//                 <label htmlFor="fullName">Full Name</label>
//                 <input type="text" className="form-control" id="fullName" name="fullName" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="dob">Date of Birth</label>
//                 <input type="date" className="form-control" id="dob" name="dob" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="ssn">SSN</label>
//                 <input type="text" className="form-control" id="ssn" name="ssn" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phoneNumber">Phone Number</label>
//                 <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input type="email" className="form-control" id="email" name="email" required />
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Update Profile
//               </button>
//             </form>
//           </div>
//         );
//       default:
//         return <h2>Welcome to Patient Dashboard</h2>;
//     }
//   };

//   return (
//     <div className="patient-dashboard">
//       <div className="top-navbar">
//         <div className="app-name">EduHealthChain</div>
//         <Logout />
//       </div>
//       <div className="main-content">
//         <div className="sidebar">
//           <ul>
//             <li className={activePage === 'Dashboard' ? 'active' : ''} onClick={() => handleNavigation('Dashboard')}>
//               Dashboard
//             </li>
//             <li className={activePage === 'BookAppointments' ? 'active' : ''} onClick={() => handleNavigation('BookAppointments')}>
//               Book Appointments
//             </li>
//             <li className={activePage === 'ViewAppointments' ? 'active' : ''} onClick={() => handleNavigation('ViewAppointments')}>
//               View Appointments
//             </li>
//             <li className={activePage === 'ViewMedications' ? 'active' : ''} onClick={() => handleNavigation('ViewMedications')}>
//               View Medications
//             </li>
//             <li className={activePage === 'UpdateProfile' ? 'active' : ''} onClick={() => handleNavigation('UpdateProfile')}>
//               Update Profile
//             </li>
//           </ul>
//         </div>
//         <div className="content">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default PatientIndex;
