import NavBar from "../components/NavBar";
import "../css/Registration.css";
import { MdGeneratingTokens } from "react-icons/md";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const Registration = () => {
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    reason: "",
  });

  // Storing queue data
  const [queue, setQueue] = useState([]);

  // Get patients from Supabase
  const getPatients = async () => {
   const { data, error } = await supabase
  .from("patients")
  .select("*")
  .in("status", ["waiting", "serving"])
  .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setQueue(data);
  };

  // Get patients when page loads
  useEffect(() => {
    getPatients();
  }, []);

  // Listen for Supabase realtime changes
  useEffect(() => {
    const channel = supabase
      .channel("patients-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "patients",
        },
        () => {
          getPatients();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
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

  const handleSubmit = async (e) => {
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

    // Preventing inappropriate data
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

    // Duplicate patient join
    const { data: existingPatient, error: checkError } = await supabase
      .from("patients")
      .select("id")
      .eq("phone", formData.phone)
      .in("status", ["waiting", "serving"])
      .limit(1);

    if (checkError) {
      console.error(checkError);
      alert("Something went wrong. Please try again.");
      return;
    }

    if (existingPatient.length > 0) {
      alert("You are already in the queue.");
      return;
    }

    // Insert patient into Supabase
    const { data, error } = await supabase
      .from("patients")
      .insert([
        {
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          reason: formData.reason,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      alert("Failed to join queue.");
      return;
    }

    console.log("Patient added:", data);

    sessionStorage.setItem("currentPatientPhone", formData.phone);

    setFormData({
      name: "",
      phone: "",
      service: "",
      reason: "",
    });
  };

  // Cancel btn
const handleCancel = async () => {
  console.log("Cancel clicked");
  console.log("Phone:", currentPatientPhone);

  const { data, error } = await supabase
    .from("patients")
    .update({ status: "skipped" })
    .eq("phone", currentPatientPhone)
    .in("status", ["waiting", "serving"])
    .select();

  console.log("Updated patient:", data);
  console.log("Update error:", error);

  if (error) {
    console.error(error);
    alert("Failed to cancel queue.");
    return;
  }

  if (!data || data.length === 0) {
    alert("No patient was updated.");
    return;
  }

  sessionStorage.removeItem("currentPatientPhone");

  await getPatients();

  alert("Queue cancelled successfully.");
};

  // Current patient phone
  const currentPatientPhone =
    sessionStorage.getItem("currentPatientPhone");

  // Your position
const waitingQueue = queue.filter(
  (patient) => patient.status === "waiting"
);

const yourPosition =
  waitingQueue.findIndex(
    (patient) => patient.phone === currentPatientPhone
  ) + 1;

    // serving pateint
    const servingPatient = queue.find(
  (patient) => patient.status === "serving"
);

  // Estimated time
  const averageTime = 15;

  const estimatedWait =
    yourPosition > 0
      ? (yourPosition - 1) * averageTime
      : 0;

  // Cancel button rendering
  const isJoined = queue.some(
  (patient) =>
    patient.phone === currentPatientPhone &&
    ["waiting", "serving"].includes(patient.status)
);

  return (
    <>
      <NavBar />

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
            <h1>
              {servingPatient ? servingPatient.name : "No one"}
            </h1>

            <span>
              Currently being served
            </span>
          </div>

          <div className="queue-details">

            <div className="queue-item">
              <span>People Waiting</span>
             <strong>
  {queue.filter((patient) => patient.status === "waiting").length}
</strong>
            </div>

            <div className="queue-item">
              <span>Estimated Wait</span>
              <strong>{estimatedWait} min</strong>
            </div>

            <div className="queue-item">
              <span>Your Position</span>
              <strong>
                {yourPosition > 0 ? yourPosition : "—"}
              </strong>
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

          <form
            onSubmit={handleSubmit}
            className="registration-form"
          >

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
              <label htmlFor="service">
                Select Service
              </label>

              <select
                id="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">
                  Choose a service
                </option>

                <option value="general">
                  General Consultation
                </option>

                <option value="checkup">
                  Health Checkup
                </option>

                <option value="blood-test">
                  Blood Test
                </option>

                <option value="follow-up">
                  Follow-up Care
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reason">
                Reason for Visit
              </label>

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