import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

import '../styles/dashboard.css';

const AdminIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page

  const handleNavigation = (page) => {
    setActivePage(page); // Change the active page
  };

  const renderContent = () => {
    // Render content based on active page
    switch (activePage) {
      case 'Dashboard':
        return <h2>Welcome to Admin Dashboard</h2>;
      case 'ViewPatients':
        return <h2>View Patients Page</h2>;
      case 'ViewDoctors':
        return <h2>View Doctors Page</h2>;
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
