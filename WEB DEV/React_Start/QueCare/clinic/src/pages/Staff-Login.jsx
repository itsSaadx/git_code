import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StaffLogin.css";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo staff credentials
    const staffEmail = "staff@queuecare.com";
    const staffPassword = "123456";

    if (email === staffEmail && password === staffPassword) {
      sessionStorage.setItem("staffLoggedIn", "true");

      navigate("/staff");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <main className="staff-login">

      <div className="staff-login-card">

        <h1>Staff Login</h1>

        <p>
          Login to manage the clinic queue.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@queuecare.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              required
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </main>
  );
};

export default StaffLogin;