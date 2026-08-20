import "../css/Hero.css";
import { MdGeneratingTokens } from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">

      {/* Left side - Text */}
      <div className="hero-left">
        <h1>Your Health. Our Priority.</h1>

        <p>
          Quality healthcare with less waiting.
          Join the queue, track your turn, and visit
          the clinic when your turn is near.
        </p>

        <Link to="/registration">
          <button>
            Get Your Token
            <span>
              <MdGeneratingTokens />
            </span>
          </button>
        </Link>
      </div>

      {/* Right side - Image   */}
      <div className="hero-right">
        <img src="/d.png" alt="Doctor" />
      </div>

    </section>
  );
};

export default Hero;