import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Logout  from './logout';

import '../styles/dashboard.css';

const DoctorIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page

  const handleNavigation = (page) => {
    setActivePage(page); // Change the active page
  };



    
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
  


  let AddMedication = (
    <div>
      <h2>Add Medications Page</h2>
      <form>
        <div className="form-group">
          <label htmlFor="medicine">Medicine</label>
          <input type="text" className="form-control" id="medicine" placeholder="Enter medication name" />
        </div>
        
        <div className="form-group">
          <label htmlFor="dosage">Dosage Info</label>
          <input type="text" className="form-control" id="dosage" placeholder="Enter dosage information" />
        </div>
        
        <div className="form-group">
          <label htmlFor="usageGuide">Usage Guide</label>
          <textarea className="form-control" id="usageGuide" rows="4" placeholder="Enter usage guide for the medicine"></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">Add Medication</button>
      </form>
    </div>
  );
  
  let ViewMedication = (
    <div>
      <h2>View Medications Page</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Patient Username</th>
            <th>Prescribed Date</th>
            <th>Medicine Name</th>
            <th>Dosage Info</th>
            <th>Usage Guide</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>john_doe</td>
            <td>2024-11-01</td>
            <td>Amoxicillin</td>
            <td>500mg, 3 times a day</td>
            <td>Take with food</td>
          </tr>
          <tr>
            <td>jane_smith</td>
            <td>2024-10-25</td>
            <td>Paracetamol</td>
            <td>250mg, every 4 hours</td>
            <td>Drink plenty of fluids</td>
          </tr>
          <tr>
            <td>mike_brown</td>
            <td>2024-10-15</td>
            <td>Ibuprofen</td>
            <td>400mg, 2 times a day</td>
            <td>Avoid alcohol while on medication</td>
          </tr>
          <tr>
            <td>lisa_white</td>
            <td>2024-09-30</td>
            <td>Metformin</td>
            <td>500mg, once a day</td>
            <td>Take with breakfast</td>
          </tr>
          <tr>
            <td>emily_jones</td>
            <td>2024-09-20</td>
            <td>Simvastatin</td>
            <td>20mg, once at night</td>
            <td>Avoid grapefruit</td>
          </tr>
          <tr>
            <td>robert_lee</td>
            <td>2024-09-15</td>
            <td>Losartan</td>
            <td>50mg, once a day</td>
            <td>May cause dizziness, take with water</td>
          </tr>
          <tr>
            <td>alex_davis</td>
            <td>2024-08-30</td>
            <td>Amoxicillin</td>
            <td>250mg, 4 times a day</td>
            <td>Finish the full course</td>
          </tr>
          <tr>
            <td>paul_martin</td>
            <td>2024-08-10</td>
            <td>Penicillin</td>
            <td>500mg, every 6 hours</td>
            <td>Take on an empty stomach</td>
          </tr>
          <tr>
            <td>anna_taylor</td>
            <td>2024-07-25</td>
            <td>Prednisone</td>
            <td>10mg, once a day</td>
            <td>Avoid sudden stop, taper dose</td>
          </tr>
          <tr>
            <td>jason_johnson</td>
            <td>2024-07-15</td>
            <td>Aspirin</td>
            <td>81mg, once a day</td>
            <td>Take with food</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  let ApproveAppoinment = (
    <div>
      <h2>View Appointments</h2>
      <div className="card-deck">
        {/* Appointment Card 1 */}
        <div className="card" style={{ width: '22rem' }}>
          <div className="card-body">
            <h5 className="card-title">Appointment 1</h5>
            <p className="card-text"><strong>Date:</strong> 2024-11-01</p>
            <p className="card-text"><strong>Time:</strong> 10:00 AM</p>
            <p className="card-text"><strong>Reason:</strong> Regular Checkup</p>
            <div className="btn-group" role="group" aria-label="Appointment Actions">
              <button type="button" className="btn btn-success" style={{ marginLeft: '40%', marginRight: '20px' }}>Accept</button>
              <button type="button" className="btn btn-danger">Reject</button>
            </div>
          </div>
        </div>
  
        
      </div>
    </div>
  );
  

  

  let welcome = (
    <h2>Welcome to Doctor Dashboard</h2>

  );


  const renderContent = () => {
    // Render content based on active page
    switch (activePage) {
      case 'Dashboard':
        return welcome;
      case 'ApproveAppointments':
        return ApproveAppoinment;
      case 'AddMedications':
        return AddMedication;
      case 'ViewMedications':
        return ViewMedication;
    //   case 'View Patients':
        // return <h2>View Patients Page</h2>;
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
      className={activePage === 'ApproveAppointments' ? 'active' : ''} 
      onClick={() => handleNavigation('ApproveAppointments')}
    >
      Approve Appointments
    </li>
    <li 
      className={activePage === 'AddMedications' ? 'active' : ''} 
      onClick={() => handleNavigation('AddMedications')}
    >
      Add Medications
    </li>
    <li 
      className={activePage === 'ViewMedications' ? 'active' : ''} 
      onClick={() => handleNavigation('ViewMedications')}
    >
      View Medications
    </li>
    {/* <li 
      className={activePage === 'View Patients' ? 'active' : ''} 
      onClick={() => handleNavigation('View Patients')}
    >
      View Patients
    </li> */}
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

export default DoctorIndex;
