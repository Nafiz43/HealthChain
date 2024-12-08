import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Logout  from './logout';
import { useLocation } from 'react-router-dom';

import '../styles/dashboard.css';

const PatientIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const [medications, setMedications] = useState([]);

  const [message, setMessage] = useState('');

  const location = useLocation();
  let msg;
  let pubKey = location.state.publicKey;
  let username = location.state.username;
  let secKey = location.state.secretKey;
  let role = location.state.role;
  console.log("LLL, ", location.state)
  console.log("ll ", pubKey)

  const handleNavigation = (page) => {
    setActivePage(page); // Change the active page
  };


  /// CODE for VIEWING APPOINTMENTS ####
   // Fetch Appointments
   const fetchAppointments = async () => {
    setLoading(true); 
    setTimeout(async () => {
    try {
      try {
// <<<<<<< dec6
//         const response = await fetch(`http://localhost:5050/PatientViewAppointments?publicKey=${pubKey}`);
// =======
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/PatientViewAppointments?publicKey=${pubKey}`);
// >>>>>>> master
        const data = await response.json();
        console.log("Data Length Printing: ",data.appointments.length)
        console.log("lllkl ",data)
        setAppointments(data.appointments || []);
        
      
        if(data.appointments.length <= 0)
        {
          alert("No Appointments Data in HealthChain");
        }
        
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    } catch (error) {

    } finally {
      setLoading(false); 
    }
  }, 10000); 

    
  };

  let ViewAppointment = (
    <div> 
        <button onClick={fetchAppointments}>View Appointments</button>

      <center><h2>Appointments</h2></center>

      {appointments.length > 0 ? ( // Check if appointments array has data
        <table className="table table-striped" style={{ width: '100%' }}>
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
      ) : (
        <p>No appointments to display yet. Click on the <b>View Appointments</b> button to view appointments</p> // Placeholder for empty data
      )}

      {loading && ( // Loader overlay
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

    </div>
  );
  /// CODE END for VIEWING APPOINTMENTS ####


  /// CODE for VIEWING MEDICATIONS ####
    // Fetch Medications
    const fetchMedications = async () => {
      setLoading(true); 
      setTimeout(async () => {
      try {
        try {
// <<<<<<< dec6
//           const response = await fetch(`http://localhost:5050/PatientViewMedications?publicKey=${pubKey}&username=${username}`);
// =======
          const response = await fetch(`${process.env.REACT_APP_BACKEND}/PatientViewMedications?publicKey=${pubKey}&username=${username}`);
// >>>>>>> master
          const data = await response.json();
          setMedications(data.medications || []);
          if(data.medications.length <= 0)
            {
              alert("No Medications Data in HealthChain");
            }
  
        } catch (error) {
          console.error('Error fetching medications:', error);
        }
      } catch (error) {

      } finally {
        setLoading(false); 
      }
    }, 10000); 



    };

    let viewMedication = (
      <div>
        <button onClick={fetchMedications}>View Received Medications</button>
  
        <center><h2>Medications</h2></center>

        {medications.length > 0 ? ( // Check if medications array has data
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
      ) : (
        <p>No medications to display yet. Click on the <b>View Medications</b> button to view medications</p> 
      )}
       {loading && ( // Loader overlay
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

      </div>
    );


  /// CODE END for VIEWING MEDICATIONS ####


/// CODE for BOOKING APPOINTMENTS ####
    const handleBookAppointment = async (event, publicKey) => {
      event.preventDefault();
      setLoading(true); 
      setTimeout(async () => {
      try {
          const form = event.target;
          const formData = new FormData(event.target);
          const data = {
            date: formData.get('appointment-date'),
            time: formData.get('appointment-time'),
            doctor: formData.get('doctor-name'),
            reason: formData.get('appointment-reason'),
          };
          // alert(formData.get('appointment-date'))
          console.log(pubKey)
          console.log(secKey)
          
          try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/bookAppointment?publicKey=${pubKey}&secKey=${secKey}&username=${username}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            const result = await response.json();
            alert(result.message || 'Appointment booked successfully!');
            form.reset();
            
            const doctorField = form.querySelector('[name="doctor-name"]');
            if (doctorField) doctorField.value = '';
          
          } catch (error) {
            alert('Error booking appointment: ' + error.message);
          }
        
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false); 
      }
    }, 10000); 
    };


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
        {loading && ( // Loader overlay
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      </div>
    );
    
/// #### CODE END for BOOKING APPOINTMENTS ####

/// CODE FOR UPDATING PROFILE #####
      // Update Profile API call
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setLoading(true); 
    setTimeout(async () => {
    try {
      const form = event.target;
      const formData = new FormData(event.target);
      const data = {
        name: formData.get('full-name'),
        dob: formData.get('dob'),
        ssn: formData.get('ssn'),
        phone: formData.get('phone-number'),
        email: formData.get('email'),
      };
      // alert(formData.get('phone-number'))
      console.log(data)

      try {
// <<<<<<< dec6
//         const response = await fetch(`http://localhost:5050/UpdateProfile?publicKey=${pubKey}&secKey=${secKey}&username=${username}&role=${role}`, {
// =======
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/UpdateProfile?publicKey=${pubKey}&secKey=${secKey}&username=${username}&role=${role}`, {
// >>>>>>> master
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        alert(result.message || 'Profile updated successfully!');
        form.reset();
      } catch (error) {
        alert('Error updating profile: ' + error.message);
      }
    } catch (error) {

    } finally {
      setLoading(false); 
    }
  }, 10000); 


    
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
/// CODE END FOR UPDATING PROFILE #####



  let welcome = (
    <h2>Welcome to Patient Dashboard</h2>
  )



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
        <p style={{fontSize: '18px'}}><b>PATIENT</b></p>
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