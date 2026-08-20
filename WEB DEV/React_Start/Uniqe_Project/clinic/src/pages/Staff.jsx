import {
  MdPhone,
  MdSearch,
  MdSkipNext,
  MdPlayArrow,
  MdAccessTime,
} from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import "../css/Staff.css";
import { useEffect, useState } from "react";

const Staff = () => {

const [patients, setPatients] = useState([]);
const [currentPatient, setCurrentPatient] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const averageTime = 15;

// getting  savedque 
  useEffect(() => {
  const savedQueue = localStorage.getItem("queue");

  if (savedQueue) {
    setPatients(JSON.parse(savedQueue));
  }
}, []);

// Listen to Change of Storage
useEffect(() => {
  const handleStorageChange = () => {
    const savedQueue = localStorage.getItem("queue");

    if (savedQueue) {
      setPatients(JSON.parse(savedQueue));
    } else {
      setPatients([]);
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);

// Call Next
const handleCallNext = () => {
  // No patients left
  if (patients.length === 0) {
    setCurrentPatient(null);

    sessionStorage.removeItem("currentServingPatient");

    return;
  }

  // Take first patient
  const nextPatient = patients[0];

  // Make them currently serving
  setCurrentPatient(nextPatient);

  sessionStorage.setItem(
    "currentServingPatient",
    JSON.stringify(nextPatient)
  );

  // Remove them from waiting queue
  const updatedQueue = patients.slice(1);

  setPatients(updatedQueue);

  localStorage.setItem(
    "queue",
    JSON.stringify(updatedQueue)
  );
};

// Skip

const handleSkip = (phone) => {
  const updatedQueue = patients.filter(
    (patient) => patient.phone !== phone
  );

  setPatients(updatedQueue);

  localStorage.setItem(
    "queue",
    JSON.stringify(updatedQueue)
  );
};

// Search

const displayedPatients = searchTerm
  ? [
      ...patients.filter((patient) =>
        patient.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),

      ...patients.filter(
        (patient) =>
          !patient.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      ),
    ]
  : patients;

  return (
    <main className="staff-dashboard">

      {/* Decorative background */}
      <div className="dashboard-orb orb-one"></div>
      <div className="dashboard-orb orb-two"></div>


      {/* ================= HEADER ================= */}

      <header className="staff-header">

        <div className="staff-heading">

          <div className="staff-title">
            <div className="title-icon">
              <FaUserDoctor />
            </div>

            <div>
              <h1>Staff Dashboard</h1>

              <p>
                Manage today's clinic queue
              </p>
            </div>
          </div>

        </div>

        <div className="clinic-status">
          <span className="status-dot"></span>
          Clinic Open
        </div>

      </header>


      {/* ================= STAT CARDS ================= */}

      <section className="staff-stats">

        <div className="stat-card">

          <div className="stat-top">
            <span>Patients Waiting</span>

            <div className="stat-icon">
              👥
            </div>
          </div>

          <strong>{patients.length}</strong>

          <small>
            Currently in queue
          </small>

        </div>


              <div className="stat-card">

                  <div className="stat-top">
                      <span>Now Serving</span>

                      <div className="stat-icon">
                          🩺
                      </div>
                  </div>

                  <strong>
                      {currentPatient
                          ? currentPatient.name
                          : "—"}
                  </strong>

                  <small>
                      Current patient
                  </small>

              </div>


        <div className="stat-card">

          <div className="stat-top">
            <span>Estimated Wait</span>

            <div className="stat-icon">
              <MdAccessTime />
            </div>
          </div>

          <strong>{patients.length * averageTime} min</strong>

          <small>
            Approximate queue time
          </small>

        </div>

      </section>


      {/* ================= MAIN CONTENT ================= */}

      <section className="staff-content">


        {/* ================= PATIENT QUEUE ================= */}

        <div className="queue-panel">

          <div className="queue-panel-header">

            <div>
              <h2>Patient Queue</h2>

              <p>
                Patients waiting for consultation
              </p>
            </div>


            <div className="search-box">

              <MdSearch />

              <input
                type="text"
                placeholder="Search patient by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

          </div>


          {/* Patient List */}

          <div className="patient-list">

            {displayedPatients.map((patient) => (

              <div   key={patient.phone}
                className={
                  searchTerm &&
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ? "patient-card search-match"
                    : "patient-card"
                }
              >

                {/* Position */}

                <div className="patient-position">
                  <span>
                    #{patient.position}
                  </span>
                </div>


                {/* Patient Details */}

                <div className="patient-details">

                  <div className="patient-name-row">

                    <h3>
                      {patient.name}
                    </h3>

                    {patient.position === 1 && (
                      <span className="next-badge">
                        NEXT
                      </span>
                    )}

                  </div>


                  <div className="patient-phone">

                    <MdPhone />

                    <span>
                      {patient.phone}
                    </span>

                  </div>


                  <div className="patient-info">

                    <span className="service-badge">
                      {patient.service}
                    </span>

                    <span className="reason">
                      {patient.reason}
                    </span>

                  </div>

                </div>


                {/* Skip Button */}

                    <button
                        className="skip-btn"
                        onClick={()=>handleSkip(patient.phone)}
                    >
                        <MdSkipNext />
                        <span>Skip</span>
                    </button>

              </div>

            ))}

          </div>

        </div>


        {/* ================= CONTROL PANEL ================= */}

        <aside className="control-panel">


          {/* Now Serving */}

          <div className="serving-card">

            <div className="serving-header">

              <span>
                NOW SERVING
              </span>

              <span className="serving-live">
                ● LIVE
              </span>

            </div>


           


            <div className="serving-patient">

              <div className="serving-avatar">
                MS
              </div>

              <div>
                <h3>
                  {currentPatient ? currentPatient.name : "No patient"}
                </h3>

                <p>
                   {currentPatient
        ? currentPatient.service
        : "Waiting for next patient"}
                </p>
              </div>

            </div>


            <div className="serving-time">

              <MdAccessTime />

              <span>
                Consultation in progress
              </span>

            </div>

          </div>


          {/* Call Next */}

          <button onClick={handleCallNext} className="call-next-btn">

            <span className="call-icon">
              <MdPlayArrow />
            </span>

            <span>
              Call Next Patient
            </span>

          </button>


          {/* Queue Insight */}

          <div className="queue-insight">

            <div className="insight-icon">
              ✦
            </div>

            <div>

              <h3>
                Queue Insight
              </h3>

                          <p>
                              {patients.length === 0
                                  ? "You're all caught up."
                                  : patients.length === 1
                                      ? "1 patient is currently waiting."
                                      : `${patients.length} patients are currently waiting.`}
                          </p>

            </div>

          </div>


          {/* Quick Stats */}

          <div className="quick-info">

            <div>
              <span>Average consultation</span>
              <strong>15 min</strong>
            </div>

            <div>
              <span>Queue status</span>
              <strong className="good-status">
                Healthy
              </strong>
            </div>

          </div>

        </aside>

      </section>

    </main>
  );
};

export default Staff;