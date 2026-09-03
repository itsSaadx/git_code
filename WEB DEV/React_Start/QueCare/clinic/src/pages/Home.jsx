import "../css/Home.css";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

 const Home = () => {
  return (
    <>
     <NavBar />
      <Hero />
    <main className="clinic-main">

      {/* Clinic Information */}
      <section className="clinic-info">

        <div className="clinic-header">
          <h2>Sunrise Multispeciality Clinic</h2>
          <p>Quality healthcare with less waiting.</p>
        </div>

        {/* Doctor Details */}
        <div className="doctor-details">
          <h3>Dr. Rahul Sharma</h3>
          <p>General Physician</p>
          <p>10+ years of experience</p>
        </div>

        {/* Timing */}
        <div className="clinic-timing">
          <h3>Clinic Timings</h3>
          <p>Monday - Saturday</p>
          <p>9:00 AM - 1:00 PM</p>
          <p>4:00 PM - 8:00 PM</p>
        </div>

        {/* Contact */}
        <div className="contact-details">
          <h3>Contact</h3>
          <p>📞 +91 98765 43210</p>
          <p>📍 Main Road, Hyderabad</p>
          <p>✉️ contact@sunriseclinic.com</p>
        </div>

      </section>

      {/* Services */}
      <section className="services">

        <h2>Our Services</h2>

        <div className="service-list">

          <div className="service-card">
            <h3>General Consultation</h3>
            <p>Consult with our doctor for common health concerns.</p>
          </div>

          <div className="service-card">
            <h3>Health Checkup</h3>
            <p>Routine health examinations and basic checkups.</p>
          </div>

          <div className="service-card">
            <h3>Blood Test</h3>
            <p>Basic laboratory testing and health screening.</p>
          </div>

          <div className="service-card">
            <h3>Follow-up Care</h3>
            <p>Regular follow-up consultations and treatment guidance.</p>
          </div>

        </div>

      </section>

  

    </main>
    </>
  );
};

export default Home;