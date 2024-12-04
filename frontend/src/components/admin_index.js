import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Logout  from './logout';

import '../styles/dashboard.css';
//add loader here....
const AdminIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state



  const handleNavigation = (page) => {
    setActivePage(page); // Change the active page
  };


// ### CODE FOR UPDATE PROFILE ####
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

    try {
      const response = await fetch('http://localhost:5050/UpdateProfile', {
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
// ### CODE END FOR UPDATE PROFILE ####



  let welcome = (
    <h2>Welcome to Admin Dashboard</h2>
  )
    

// ### CODE FOR VIEW Patients ####

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:5050/viewPatients');
      const data = await response.json();
      setPatients(data.patients || []); // Store patients in the state
    } catch (error) {
      console.error('Error fetching Patient Info:', error);
    }
  };
  
  let ViewPatientInfo = (
    <div>
      <button onClick={fetchPatients}>View Patients</button>
      <center><h2>View Patients Info</h2></center>
      {patients.length>0? (<table className="table table-striped" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>SSN</th>
            <th>Entry Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => ( // Iterate over patients array
            <tr key={index}>
              <td>{patient.username}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>{patient.ssn}</td>
              <td>{patient.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>):(<p>No Patient profile to display yet. Click on the <b>View Patient Profile</b> button to view the registered patients</p>)}
    </div>
  );
// ### CODE END FOR VIEW Patients ####

// ### CODE FOR VIEW DOCTORS ####

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5050/viewDoctors');
      const data = await response.json();
      setDoctors(data.doctors || []); // Update doctors state with fetched data
    } catch (error) {
      console.error('Error fetching Doctors Info:', error);
    }
  };
  
  let ViewDoctorInfo = (
    <div>
      <button onClick={fetchDoctors}>View Doctors</button> {/* Correct trigger */}
      <center><h2>View Doctors Info</h2></center>
      {doctors.length>0? (<table className="table table-striped" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>SSN</th>
            <th>Entry Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => ( // Iterate over doctors array
            <tr key={index}>
              <td>{doctor.username}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.ssn}</td>
              <td>{doctor.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>):(<p>No Doctor profile to display yet. Click on the <b>View Doctor Profile</b> button to view the registered doctors</p> )}
    </div>
  );
// ### CODE END FOR VIEW DOCTORS ####

  const renderContent = () => {
    // Render content based on active page
    switch (activePage) {
      case 'Dashboard':
        return welcome;
      case 'ViewPatients':
        return ViewPatientInfo;
      case 'ViewDoctors':
        return ViewDoctorInfo;
      case 'UpdateProfile':
        return updateProfile_;
      default:
        return <h2>Welcome to Patient Dashboard</h2>;
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
                <li
                className={activePage === 'Dashboard' ? 'active' : ''}
                onClick={() => handleNavigation('Dashboard')}
                >
                Dashboard
                </li>
                <li
                className={activePage === 'ViewPatients' ? 'active' : ''}
                onClick={() => handleNavigation('ViewPatients')}
                >
                View Patients
                </li>
                <li
                className={activePage === 'ViewDoctors' ? 'active' : ''}
                onClick={() => handleNavigation('ViewDoctors')}
                >
                View Doctors
                </li>
                <li
                className={activePage === 'UpdateProfile' ? 'active' : ''}
                onClick={() => handleNavigation('UpdateProfile')}
                >
                Update Profile
                </li>
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

export default AdminIndex;
