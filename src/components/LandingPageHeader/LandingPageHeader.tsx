import "./LandingPageHeader.scss";
import logo from "../../assets/linkedin.png";
import Hamburger from "../Hamburger/Hamburger";

function LandingPageHeader() {
  return (
    <div className="header">
      <div className="logo">
        <img className="logo-img" src={logo} alt="" />
      </div>
      <div className="header-interactions">
        <div className="buttons">
          <button className="signup-btn">Signup</button>
          <button className="login-btn">login</button>
        </div>
        <Hamburger />
      </div>
    </div>
  );
}

export default LandingPageHeader;
