import "./LandingPageHeader.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/openart-image_ARVnT7my_1729012412974_raw.jpg";
import Hamburger from "../Hamburger/Hamburger";

function LandingPageHeader() {
  return (
    <div className="header">
      <div className="logo">
        <img
          className="logo__img"
          src={logo}
          alt="Workflow's Logo, W in cyan/darkturquoise"
        />{" "}
        wrkflw
      </div>
      <div className="header-interactions">
        <div className="buttons">
          <Link to="/signup" className="signup-btn">
            Signup
          </Link>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
        <Hamburger />
      </div>
    </div>
  );
}

export default LandingPageHeader;
