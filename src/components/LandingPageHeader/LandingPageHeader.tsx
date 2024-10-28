import "./LandingPageHeader.scss";
import { Link } from "react-router-dom";
// import Hamburger from "../Hamburger/Hamburger";
import Logo from "../Logo/Logo";

function LandingPageHeader() {
  return (
    <div className="header">
      <Logo />
      <div className="header-interactions">
        <div className="buttons">
          <Link to="/signup" className="signup-btn">
            Signup
          </Link>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
        {/* <Hamburger /> */}
      </div>
    </div>
  );
}

export default LandingPageHeader;
