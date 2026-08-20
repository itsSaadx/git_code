import NavBar from "../components/NavBar";
import "../css/Registration.css";
import { MdGeneratingTokens } from "react-icons/md";
import { useState , useEffect } from "react";

const Registration = () => {
// Form data
const [formData, setFormData] = useState({
  name: "", 
  phone: "",
  service: "",
  reason: "",
});

// storing form data in que
const [queue, setQueue] = useState([]);

// get saved queue 
useEffect(() => {
  const savedQueue = localStorage.getItem("queue");

  if (savedQueue) {
    setQueue(JSON.parse(savedQueue));
  }
}, []);

// listen Change of storage
useEffect(() => {
  const handleStorageChange = () => {
    const savedQueue = localStorage.getItem("queue");

    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    } else {
      setQueue([]);
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);

const handleChange = (e) => {
  const id = e.target.id;
  const value = e.target.value;

  setFormData((prev) => ({
    ...prev,
    [id]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();

  
  if (
    !formData.name ||
    !formData.phone ||
    !formData.service ||
    !formData.reason
  ) {
    alert("Please fill in all fields.");
    return;
  }

  //preventing user to enter unappropirate data in input 
  const nameRegex = /^[A-Za-z ]+$/;

if (!nameRegex.test(formData.name)) {
  alert("Name should contain only letters.");
  return;
}

const phoneRegex = /^[0-9]{10}$/;

if (!phoneRegex.test(formData.phone)) {
  alert("Enter a valid 10-digit phone number.");
  return;
}

const reasonRegex = /[A-Za-z]/;

if (!reasonRegex.test(formData.reason)) {
  alert("Please enter a valid reason.");
  return;
}

  // Duplicate pateint join
  const alreadyJoined = queue.some(
  (patient) => patient.phone === formData.phone
);

if (alreadyJoined) {
  alert("You are already in the queue.");
  return;
}


    
  // putting old queue obj inside new array
  const updatedQueue = [...queue, formData];

  setQueue(updatedQueue);

  localStorage.setItem("queue", JSON.stringify(updatedQueue));

  sessionStorage.setItem("currentPatientPhone", formData.phone);

  console.log(updatedQueue);

   setFormData({
    name: "",
    phone: "",
    service: "",
    reason: "",
  });


};

// Cancel btn
const handleCancel = () => {
  const updatedQueue = queue.filter(
    (patient) => patient.phone !== currentPatientPhone
  );

  setQueue(updatedQueue);

  localStorage.setItem("queue", JSON.stringify(updatedQueue));

  sessionStorage.removeItem("currentPatientPhone");
};

// Your Position
const currentPatientPhone =
  sessionStorage.getItem("currentPatientPhone");

const yourPosition =
  queue.findIndex(
    (patient) => patient.phone === currentPatientPhone
  ) + 1;

  // estimated time 
const averageTime = 15;

const estimatedWait =
  yourPosition > 0
    ? (yourPosition - 1) * averageTime
    : 0;
   
    // Cancel btn Rendring on joining
    const isJoined = queue.some(
  (patient) => patient.phone === currentPatientPhone
);

  return (
    <>
    <NavBar/>
    <main className="registration">

      {/* LEFT SIDE — Live Queue */}
      <div className="registration-left">

        <div className="queue-header">
          <h2>Live Queue</h2>
          <span className="live-status">● LIVE</span>
        </div>

        <p className="queue-message">
          Current queue status
        </p>

        <div className="queue-current">
          <p>Now Serving</p>
          <h1>A-24</h1>
          <span>Dr. Rahul Sharma</span>
        </div>

        <div className="queue-details">

          <div className="queue-item">
            <span>People Waiting</span>
            <strong>{queue.length}</strong>
          </div>

          <div className="queue-item">
            <span>Estimated Wait</span>
            <strong>{estimatedWait} min</strong>
          </div>

          <div className="queue-item">
            <span>Your Position</span>
            <strong>{yourPosition > 0 ? yourPosition : "—"}</strong>
          </div>

        </div>

        <p className="queue-note">
          Queue information updates automatically.
        </p>
        
  {isJoined && (
  <button
    className="cancel-queue-btn"
    type="button"
    onClick={handleCancel}
  >
    Cancel Queue
  </button>
)}

      </div>


      {/* RIGHT SIDE — Registration Form */}
      <div className="registration-right">

        <div className="registration-header">
          <h1>Get Your Token</h1>
          <p>
            Enter your details to join the clinic queue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">Select Service</label>

            <select id="service" value={formData.service}
              onChange={handleChange}>
              <option value="">Choose a service</option>
              <option value="general">General Consultation</option>
              <option value="checkup">Health Checkup</option>
              <option value="blood-test">Blood Test</option>
              <option value="follow-up">Follow-up Care</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Visit</label>
            <textarea
              id="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Briefly describe your reason for visiting"
              rows="3"
            ></textarea>
          </div>

          <button type="submit">
            Join Queue
            <span>
              <MdGeneratingTokens />
            </span>
          </button>

        </form>

      </div>

    </main>
    </>
  );
};

export default Registration;