import logo from "../../assets/logo/openart-image_ARVnT7my_1729012412974_raw.jpg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img
          className="logo__img"
          src={logo}
          alt="Workflow's Logo, W in cyan/darkturquoise"
        />{" "}
        wrkflw
      </Link>
    </div>
  );
}

export default Logo;
