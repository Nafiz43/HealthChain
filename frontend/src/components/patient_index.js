import React, { useState } from 'react';
import '../styles/dashboard.css';

const PatientIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page

  const handleNavigation = (page) => {
    setActivePage(page); // Change the active page
  };

  const renderContent = () => {
    // Render content based on active page
    switch (activePage) {
      case 'Dashboard':
        return <h2>Welcome to Patient Dashboard</h2>;
      case 'BookAppointments':
        return <h2>Book Appointments Page</h2>;
      case 'ViewAppointments':
        return <h2>View Appointments Page</h2>;
      case 'ViewMedications':
        return <h2>View Medications Page</h2>;
      case 'UpdateProfile':
        return <h2>Update Profile Page</h2>;
      default:
        return <h2>Welcome to Patient Dashboard</h2>;
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
