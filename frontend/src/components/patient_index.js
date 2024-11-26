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
    <div style={{ marginLeft: '-30%' }}> 
      <center style={{ marginLeft: '30%' }}><h2>Your Appointments</h2></center>
      <table className="table table-striped"  style={{ width: '160%' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-11-27</td>
            <td>10:00 AM</td>
            <td>Dr. John Smith</td>
            <td className="text-success">Approved</td>
          </tr>
          <tr>
            <td>2024-11-28</td>
            <td>11:30 AM</td>
            <td>Dr. Jane Doe</td>
            <td className="text-warning">Pending</td>
          </tr>
          <tr>
            <td>2024-12-01</td>
            <td>09:00 AM</td>
            <td>Dr. Richard Miles</td>
            <td className="text-success">Approved</td>
          </tr>
          <tr>
            <td>2024-12-02</td>
            <td>03:15 PM</td>
            <td>Dr. Clara Taylor</td>
            <td className="text-warning">Pending</td>
          </tr>
          <tr>
            <td>2024-12-03</td>
            <td>01:00 PM</td>
            <td>Dr. Emily Watson</td>
            <td className="text-success">Approved</td>
          </tr>
          <tr>
            <td>2024-12-04</td>
            <td>11:45 AM</td>
            <td>Dr. Michael Brown</td>
            <td className="text-warning">Pending</td>
          </tr>
          <tr>
            <td>2024-12-05</td>
            <td>08:30 AM</td>
            <td>Dr. Sophie Adams</td>
            <td className="text-success">Approved</td>
          </tr>
          <tr>
            <td>2024-12-06</td>
            <td>04:00 PM</td>
            <td>Dr. George Collins</td>
            <td className="text-warning">Pending</td>
          </tr>
          <tr>
            <td>2024-12-07</td>
            <td>02:20 PM</td>
            <td>Dr. Nancy Carter</td>
            <td className="text-success">Approved</td>
          </tr>
          <tr>
            <td>2024-12-08</td>
            <td>10:10 AM</td>
            <td>Dr. William Harris</td>
            <td className="text-warning">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  

  let viewMedication = (
    <div>
      <center><h2>Medications</h2></center>
      <table className="table table-striped" style={{ width: '100%' }}>
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
          <tr>
            <td>2024-11-25</td>
            <td>Amoxicillin</td>
            <td>500mg, Twice a Day</td>
            <td>Dr. John Smith</td>
            <td>Take after meals with a glass of water. Avoid dairy products.</td>
          </tr>
          <tr>
            <td>2024-11-24</td>
            <td>Ibuprofen</td>
            <td>200mg, As Needed</td>
            <td>Dr. Jane Doe</td>
            <td>Use for pain relief. Do not exceed 3 doses in 24 hours.</td>
          </tr>
          <tr>
            <td>2024-11-23</td>
            <td>Metformin</td>
            <td>850mg, Once a Day</td>
            <td>Dr. Emily White</td>
            <td>Take with breakfast to reduce stomach upset. Monitor blood sugar regularly.</td>
          </tr>
          <tr>
            <td>2024-11-22</td>
            <td>Lisinopril</td>
            <td>10mg, Once a Day</td>
            <td>Dr. Adam Brown</td>
            <td>Take at the same time daily. Avoid potassium-rich foods.</td>
          </tr>
          <tr>
            <td>2024-11-21</td>
            <td>Simvastatin</td>
            <td>40mg, Before Bedtime</td>
            <td>Dr. Sarah Taylor</td>
            <td>Take in the evening for maximum effectiveness. Avoid grapefruit.</td>
          </tr>
          <tr>
            <td>2024-11-20</td>
            <td>Albuterol</td>
            <td>2 Puffs, As Needed</td>
            <td>Dr. Paul Green</td>
            <td>Shake well before use. Wait 1 minute between puffs.</td>
          </tr>
          <tr>
            <td>2024-11-19</td>
            <td>Prednisone</td>
            <td>5mg, Taper Dose</td>
            <td>Dr. John Smith</td>
            <td>Follow the prescribed taper schedule to avoid withdrawal symptoms.</td>
          </tr>
          <tr>
            <td>2024-11-18</td>
            <td>Atorvastatin</td>
            <td>20mg, Once a Day</td>
            <td>Dr. Jane Doe</td>
            <td>Take with or without food. Regular liver function tests recommended.</td>
          </tr>
          <tr>
            <td>2024-11-17</td>
            <td>Hydrochlorothiazide</td>
            <td>25mg, Morning</td>
            <td>Dr. Emily White</td>
            <td>Take in the morning to avoid nighttime urination.</td>
          </tr>
          <tr>
            <td>2024-11-16</td>
            <td>Azithromycin</td>
            <td>500mg, Once a Day</td>
            <td>Dr. Adam Brown</td>
            <td>Complete the full course even if symptoms improve.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  
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
