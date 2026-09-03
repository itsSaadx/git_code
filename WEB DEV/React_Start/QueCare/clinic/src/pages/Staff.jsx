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
import { supabase } from "../supabase";

const Staff = () => {

const [patients, setPatients] = useState([]);
const [currentPatient, setCurrentPatient] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const averageTime = 15;

// Get Patient
useEffect(() => {
  const getPatients = async () => {

    // Get waiting patients
    const { data: waitingPatients, error: waitingError } =
      await supabase
        .from("patients")
        .select("*")
        .eq("status", "waiting")
        .order("created_at", { ascending: true });

    if (waitingError) {
      console.error(waitingError);
      return;
    }

    setPatients(waitingPatients);


    // Get serving patient
    const { data: servingPatient, error: servingError } =
      await supabase
        .from("patients")
        .select("*")
        .eq("status", "serving")
        .limit(1);

    if (servingError) {
      console.error(servingError);
      return;
    }

    if (servingPatient.length > 0) {
      setCurrentPatient(servingPatient[0]);
    }
  };

  getPatients();
}, []);

//GETTING REAL TIME PATIENT 
useEffect(() => {
  const channel = supabase
    .channel("staff-queue")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "patients",
      },
      () => {
        // Get updated waiting patients
        supabase
          .from("patients")
          .select("*")
          .eq("status", "waiting")
          .order("created_at", { ascending: true })
          .then(({ data, error }) => {
            if (!error) {
              setPatients(data);
            }
          });

        // Get current serving patient
        supabase
          .from("patients")
          .select("*")
          .eq("status", "serving")
          .limit(1)
          .then(({ data, error }) => {
            if (!error) {
              setCurrentPatient(
                data.length > 0 ? data[0] : null
              );
            }
          });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

// Call next
const handleCallNext = async () => {

  // 1. Complete the currently serving patient
  if (currentPatient) {
    const { error } = await supabase
      .from("patients")
      .update({ status: "completed" })
      .eq("id", currentPatient.id);

    if (error) {
      console.error(error);
      alert("Failed to complete current patient.");
      return;
    }
  }

  // 2. Get the latest waiting patients
  const { data: waitingPatients, error: waitingError } =
    await supabase
      .from("patients")
      .select("*")
      .eq("status", "waiting")
      .order("created_at", { ascending: true });

  if (waitingError) {
    console.error(waitingError);
    alert("Failed to get waiting patients.");
    return;
  }

  // 3. Nobody waiting
  if (waitingPatients.length === 0) {
    setCurrentPatient(null);
    setPatients([]);
    return;
  }

  // 4. Take first waiting patient
  const nextPatient = waitingPatients[0];

  // 5. Change waiting → serving
  const { data, error } = await supabase
    .from("patients")
    .update({ status: "serving" })
    .eq("id", nextPatient.id)
    .select();

  if (error) {
    console.error(error);
    alert("Failed to call next patient.");
    return;
  }

  // 6. Store serving patient
  setCurrentPatient(data[0]);

  // 7. Remove them from waiting list
  setPatients(waitingPatients.slice(1));
};

// Skip
const handleSkip = async (phone) => {

  const { error } = await supabase
    .from("patients")
    .update({ status: "skipped" })
    .eq("phone", phone)
    .eq("status", "waiting");

  if (error) {
    console.error(error);
    alert("Failed to skip patient.");
    return;
  }

  setPatients(
    patients.filter((patient) => patient.phone !== phone)
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