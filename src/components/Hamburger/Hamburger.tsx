import { useState } from "react";
import "./Hamburger.scss";

function Hamburger() {
  const [activeMenu, setActiveMenu] = useState(false);

  const toggleMenu = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setActiveMenu(!activeMenu);
  };

  return (
    <div className="hamburger">
      <a
        href="#main-nav"
        className={`main-nav-toggle ${activeMenu ? "active-menu" : ""}`}
        onClick={toggleMenu}
      >
        <i>Menu</i>
      </a>
    </div>
  );
}

export default Hamburger;
