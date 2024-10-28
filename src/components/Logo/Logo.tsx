import logo from "../../assets/logo/openart-image_ARVnT7my_1729012412974_raw.jpg";
import { Link } from "react-router-dom";
import "./Logo.scss";

function Logo() {
  return (
    <Link to="/">
      <div className="logo">
        <img
          className="logo__img"
          src={logo}
          alt="Workflow's Logo, W in cyan/darkturquoise"
        />
        <p className="logo__name">wrkflw</p>
      </div>
    </Link>
  );
}

export default Logo;
