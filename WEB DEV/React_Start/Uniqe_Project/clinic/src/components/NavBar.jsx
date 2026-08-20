import { FaHeartPulse } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    // nav bar
    <nav className="navbar">
      <div className="container">
        
        <div className="navbar-brand">
          <div className="logo-icon"><FaHeartPulse /></div>  
          <span>QueueCare</span>
        </div>

        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/registration">
              Get Token
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/staff-login">
              Staff Login
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default NavBar;