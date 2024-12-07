import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import Logout  from './logout';
import { redirect, useLocation } from 'react-router-dom';


import '../styles/dashboard.css';

const DoctorIndex = () => {
  const [activePage, setActivePage] = useState('Dashboard'); // Default page
  const [medications, setMedications] = useState([]);
  const [approveAppointments, setApproveAppointments] = useState([]);
  const [loading, setLoading] = useState(false); 

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
            const response = await fetch(`http://localhost:5050/UpdateProfile?publicKey=${pubKey}&secKey=${secKey}&username=${username}&role=${role}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result)
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
          {loading && ( // Loader overlay
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}

        </div>
      );
    /// CODE END FOR UPDATING PROFILE #####

    

// CODE FOR ADDING MEDICATIONS ####
  const handleAddMedication = async (event) => {
    event.preventDefault();
    setLoading(true); 
    setTimeout(async () => {
      try {
        const form = event.target;
        const formData = new FormData(event.target);
        const data = {
          patientName: formData.get('patientName'),
          medicine: formData.get('medicine'),
          dosage: formData.get('dosage'),
          usageGuide: formData.get('usageGuide'),
        };
        alert(formData.get('patientName'))
        
        try {
          const response = await fetch(`http://localhost:5050/addMedication?publicKey=${pubKey}&username=${username}&secretKey=${secKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          alert(result.message || 'Medication Added successfully!');
          form.reset();
        } catch (error) {
          alert('Error Adding Medication: ' + error.message);
        }
      } catch (error) {

      } finally {
        setLoading(false); 
      }
    }, 10000); 

  };


  let AddMedication = (
    <div>
      <center><h2>Add Medications</h2></center>
      <form className='appointment-form' onSubmit={handleAddMedication}>
      <div className="form-group">
          <label htmlFor="medicine">Patient User Name</label>
          <input type="text" className="form-control" id="patientName" name='patientName' placeholder="Enter Patient Name" />
        </div>

        <div className="form-group">
          <label htmlFor="medicine">Medicine</label>
          <input type="text" className="form-control" id="medicine" name='medicine' placeholder="Enter Medication Name" />
        </div>
        
        <div className="form-group">
          <label htmlFor="dosage">Dosage Info</label>
          <input type="text" className="form-control" id="dosage" name='dosage' placeholder="Enter Dosage Information" />
        </div>
        
        <div className="form-group">
          <label htmlFor="usageGuide">Usage Guide</label>
          <textarea className="form-control" id="usageGuide" name='usageGuide' rows="4" placeholder="Enter usage guide for the medicine"></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">Prescribe Medication</button>
      </form>
      {loading && ( // Loader overlay
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
    </div>
  );
// CODE END FOR ADDING MEDICATIONS ####


// CODE FOR VIEWING MEDICATIONS ####
    // Fetch Medications
    const fetchMedications = async () => {
      setLoading(true); 
      setTimeout(async () => {
      try {
        try {
          const response = await fetch(`http://localhost:5050/DoctorViewMedications?publicKey=${pubKey}&username=${username}`);
          const data = await response.json();
          if(data.medications<=0)
          {
            alert("No Recorded  Medications Found in HealthChain");
          }
          setMedications(data.medications || []);
  
        } catch (error) {
          console.error('Error fetching medications:', error);
        }
      } catch (error) {
        
      } finally {
        setLoading(false); 
      }
    }, 10000); 


    };

  let ViewMedication = (
    <div>
      <button onClick={fetchMedications}>View Prescribed Medications</button>
      <center><h2>View Prescribed Medications</h2></center>
     { medications.length>0? ( <table className="table table-striped">
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
                {medications.map((medication, index) => (
                  <tr key={index}>
                    <td>{medication.patientName}</td>
                    <td>{medication.date}</td>
                    <td>{medication.medicine}</td>
                    <td>{medication.dosage}</td>
                    <td>{medication.usageGuide}</td>
                  </tr>
                ))}
          </tbody>
      </table>) : (<p>No medications to display yet. Click on the View Medication Button</p>)
     }
        {loading && ( // Loader overlay
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}

    </div>
  );
// CODE END FOR VIEWING MEDICATIONS ####


// CODE FOR VIEWING APPOINTMENTS ####
const ApproveAppointments = async () => {
  setLoading(true); 
  setTimeout(async () => {
  try {
    try {
      const response = await fetch(`http://localhost:5050/ApproveAppointments?publicKey=${pubKey}&username=${username}`);
      const data = await response.json();
      setApproveAppointments(data.appointments || []); // Fixed the key to match the backend
      if(data.appointments.length<=0)
      {
        alert("No Recorded Appointments Found in HealthChain");
      }
      // alert("Appointments fetched successfully!");
    } catch (error) {
      console.error('Error Approving Appointments:', error);
    }
  } catch (error) {
      console.log(error)
  } finally {
    setLoading(false); 
  }
}, 10000); 

  
};

// let ApproveAppoinment = (
//   <div>
//     <h2>View Appointments</h2>
//     <button onClick={ApproveAppointments}>View Appointments</button>
//     <div className="card-deck">
//       {approveAppointments.map((appointment, index) => ( // Iterate over appointments array
//         <div className="card" style={{ width: '22rem' }} key={index}>
//           <div className="card-body">
//             <h5 className="card-title">Appointment {index + 1}</h5>
//             <p className="card-text"><strong>Date:</strong> {appointment.date}</p>
//             <p className="card-text"><strong>Patient Username:</strong> {appointment.username}</p>
//             <p className="card-text"><strong>Time:</strong> {appointment.time}</p>
//             <p className="card-text"><strong>Reason:</strong> {appointment.reason}</p>
//             <div className="btn-group" role="group" aria-label="Appointment Actions">
//               <button type="button" className="btn btn-success" style={{ marginLeft: '40%', marginRight: '20px' }}>Accept</button>
//               <button type="button" className="btn btn-danger">Reject</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );


async function AcceptAppointmentAPI(appointment) {

  setLoading(true); 
  setTimeout(async () => {
  try {
    try {
      const response = await fetch(`http://localhost:5050/accept-appointment?publicKey=${pubKey}&username=${username}&secKey=${secKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: appointment.username,
          time: appointment.time,
          date: appointment.date
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to approve appointment');
      }
  
      const data = await response.json();
      console.log('Appointment approved:', data);
      if(response.status === 201) {
        redirect(`http://localhost:5050/ApproveAppointments?publicKey=${pubKey}&username=${username}`)
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  } catch (error) {
      console.log(error)
  } finally {
    setLoading(false); 
  }
}, 10000); 


  
}

async function RejectAppointmentAPI(appointment) {
  setLoading(true); 
  setTimeout(async () => {
  try {
    try {
      const response = await fetch(`http://localhost:5050/reject-appointment?publicKey=${pubKey}&username=${username}&secretKey=${secKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: appointment.username,
          time: appointment.time,
          date: appointment.date
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to reject appointment');
      }
  
      const data = await response.json();
      console.log('Appointment rejected:', data);
      if(response.status === 201) {
        redirect(`http://localhost:5050/ApproveAppointments?publicKey=${pubKey}&username=${username}`)
      }
    } catch (error) {
      console.error('Error REJECTING appointment:', error);
    }
  } catch (error) {
      console.log(error)
  } finally {
    setLoading(false); 
  }
}, 10000); 

}


// let ApproveAppoinment = (
//   <div>
//     <center><h2>View Appointments</h2></center>
//     <button onClick={ApproveAppointments}>View Appointments</button>
//     {approveAppointments.length>0? (<div className="card-deck">
//       {approveAppointments.map((appointment, index) => ( // Iterate over appointments array
//         <div className="card" style={{ width: '22rem' }} key={index}>
//           <div className="card-body">
//             <h5 className="card-title">Appointment {index + 1}</h5>
//             <p className="card-text"><strong>Date:</strong> {appointment.date}</p>
//             <p className="card-text"><strong>Patient Username:</strong> {appointment.username}</p>
//             <p className="card-text"><strong>Time:</strong> {appointment.time}</p>
//             <p className="card-text"><strong>Reason:</strong> {appointment.reason}</p>
//             <div className="btn-group" role="group" aria-label="Appointment Actions">
//               <button
//                 type="button"
//                 className="btn btn-success"
//                 style={{ marginLeft: '40%', marginRight: '20px' }}
//                 onClick={() => handleAccept(appointment)}
//               >
//                 Accept
//               </button>
//               <button type="button" className="btn btn-danger" onClick={() => handleReject(appointment)}>Reject</button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>):(<p>No appointments to display yet. Click on the <b>View Appointments</b> button to view appointments</p>)}
//     {loading && ( // Loader overlay
//           <div className="loader-overlay">
//             <div className="loader"></div>
//           </div>
//         )}

//   </div>
// );


let ApproveAppoinment = (
  <div>
<center><h2>View Appointments</h2></center>
<button onClick={ApproveAppointments}>View Appointments</button>
{approveAppointments.length > 0 ? (
  <div className="card-deck-container">
    <div className="card-deck">
      {approveAppointments.map((appointment, index) => (
        <div className="card" style={{ width: '22rem', marginBottom: '15px' }} key={index}>
          <div className="card-body">
            <h5 className="card-title">Appointment {index + 1}</h5>
            <p className="card-text">
              <strong>Date:</strong> {appointment.date}
            </p>
            <p className="card-text">
              <strong>Patient Username:</strong> {appointment.username}
            </p>
            <p className="card-text">
              <strong>Time:</strong> {appointment.time}
            </p>
            <p className="card-text">
              <strong>Reason:</strong> {appointment.reason}
            </p>
            <div className="btn-group" role="group" aria-label="Appointment Actions">
              <button
                type="button"
                className="btn btn-success"
                style={{ marginLeft: '40%', marginRight: '20px' }}
                onClick={() => handleAccept(appointment)}
              >
                Accept
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleReject(appointment)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <p>No appointments to display yet. Click on the <b>View Appointments</b> button to view appointments</p>
)}
{loading && (
  <div className="loader-overlay">
    <div className="loader"></div>
  </div>
)}


  </div>
);


// Function to handle the Accept button click
function handleAccept(appointment) {
  alert(`Patient Username: ${appointment.username}\nTime: ${appointment.time}`);
  AcceptAppointmentAPI(appointment); 
  redirect(`http://localhost:5050/ApproveAppointments?publicKey=${pubKey}&username=${username}`)
}


function handleReject(appointment) {
  alert(`Patient Username: ${appointment.username}\nTime: ${appointment.time}`);
  RejectAppointmentAPI(appointment); 
  redirect(`http://localhost:5050/ApproveAppointments?publicKey=${pubKey}&username=${username}`)
}


// CODE END FOR VIEWING APPOINTMENTS ####


  

  

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
        <p style={{fontSize: '18px'}}><b>DOCTOR</b></p>
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
      Prescribe Medications
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