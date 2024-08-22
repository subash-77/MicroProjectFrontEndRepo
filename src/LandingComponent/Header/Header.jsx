import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
const Header = () => {

  const [menuOpened, setMenuOpened] = useState(false)

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" }
    }
  }
  return (
    <section className="h-wrapper">
      <div className="h-container flexCenter paddings innerWidth">
        <img src="./logo.png" alt="logo" width={60} />

        <OutsideClickHandler
          onOutsideClick={() => setMenuOpened(false)}
        >
          <div className="h-menu flexCenter" style={getMenuStyles(menuOpened)}>

            <a href="#Home" role="H1">Home</a>
            <a href="#services" role="H2">Service</a>
            <a href="#Footer" role="H3">About Us</a>
            <a href="#contactUs" role="H4">Contact Us</a>

            <button className="button">
              {/* <a href="/login">Register</a> */}
              <a href="/login">Sign In</a>
            </button>
            {/* <button className="button">
            <a href="">Login</a>
          </button> */}
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
