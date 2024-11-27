import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Logout  from './logout';

import '../styles/dashboard.css';

const AdminIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page

  const handleNavigation = (page) => {
    setActivePage(page); // Change the active page
  };

  let welcome = (
    <h2>Welcome to Admin Dashboard</h2>
  )
    
  let updateProfile_ = (
    <div style={{ width: '60%' }}>
      <h2>Update Profile</h2>
      <form>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" className="form-control" id="dob" />
        </div>
        <div className="form-group">
          <label htmlFor="ssn">SSN</label>
          <input type="text" className="form-control" id="ssn" placeholder="Enter your SSN" />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" placeholder="Enter your phone number" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );

  let ViewPatientInfo = (
    <div>
      <h2>View Patients Info</h2>
      <table className="table table-striped" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Public Key</th>
            <th>Entry Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>JohnDoe123</td>
            <td>johndoe@example.com</td>
            <td>(123) 456-7890</td>
            <td>abcd1234xyz5678</td>
            <td>2024-11-25</td>
          </tr>
          <tr>
            <td>JaneSmith456</td>
            <td>janesmith@example.com</td>
            <td>(987) 654-3210</td>
            <td>wxyz9876abcd5432</td>
            <td>2024-11-20</td>
          </tr>
          <tr>
            <td>MikeBrown789</td>
            <td>mikebrown@example.com</td>
            <td>(555) 123-4567</td>
            <td>efgh6789ijkl0123</td>
            <td>2024-11-22</td>
          </tr>
          <tr>
            <td>AliceGreen321</td>
            <td>alicegreen@example.com</td>
            <td>(444) 555-6666</td>
            <td>ijkl3456mnop6789</td>
            <td>2024-11-23</td>
          </tr>
          <tr>
            <td>CharlieWhite654</td>
            <td>charliewhite@example.com</td>
            <td>(222) 333-4444</td>
            <td>mnop4567qrst9012</td>
            <td>2024-11-21</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  

  let ViewDoctorInfo = (
    <div>
      <h2>View Doctors Info</h2>
      <table className="table table-striped" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Public Key</th>
            <th>Entry Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>JohnDoe123</td>
            <td>johndoe@example.com</td>
            <td>(123) 456-7890</td>
            <td>abcd1234xyz5678</td>
            <td>2024-11-25</td>
          </tr>
          <tr>
            <td>JaneSmith456</td>
            <td>janesmith@example.com</td>
            <td>(987) 654-3210</td>
            <td>wxyz9876abcd5432</td>
            <td>2024-11-20</td>
          </tr>
          <tr>
            <td>MikeBrown789</td>
            <td>mikebrown@example.com</td>
            <td>(555) 123-4567</td>
            <td>efgh6789ijkl0123</td>
            <td>2024-11-22</td>
          </tr>
          <tr>
            <td>AliceGreen321</td>
            <td>alicegreen@example.com</td>
            <td>(444) 555-6666</td>
            <td>ijkl3456mnop6789</td>
            <td>2024-11-23</td>
          </tr>
          <tr>
            <td>CharlieWhite654</td>
            <td>charliewhite@example.com</td>
            <td>(222) 333-4444</td>
            <td>mnop4567qrst9012</td>
            <td>2024-11-21</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  


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
