import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

import '../styles/dashboard.css';

const PatientIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page

  const handleNavigation = (page) => {
    setActivePage(page); // Change the active page
  };

  let welcome = (
    <h2>Welcome to Patient Dashboard</h2>
  )

  let bookAppoinment = (
    <div>
      <h2>Fill up the following to Book Appointments</h2>
      <form className="appointment-form">
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
    <h2>View Appointments Page</h2>
  )

  let viewMedication = (
    <h2>View Medications Page</h2>
  )

  // let updateProfile_ = (
  //   <h2>Update Profile Page</h2>
  // )

  const renderContent = () => {
    // Render content based on active page
    switch (activePage) {
      case 'Dashboard':
        return welcome;
      case 'BookAppointments':
        return bookAppoinment;
      case 'ViewAppointments':
        return ViewAppointment;
      case 'ViewMedications':
        return viewMedication;
      case 'UpdateProfile':
        return <h2>Update Profile Page</h2>;
      default:
        return welcome;
    }
  };

  return (
    <div className="patient-dashboard">
      {/* Top Navigation Bar */}
      <div className="top-navbar">
        <div className="app-name">EduHealthChain</div>
        <button className="logout-button">Logout</button>
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
