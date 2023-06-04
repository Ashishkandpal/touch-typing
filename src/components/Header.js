import React from "react";
import AccountCircle from "./AccountCircle";

import logo from "../images/touch-typing-high-resolution-logo-black-on-white-background.png";
import { useNavigate } from "react-router-dom";
import MusicToggler from "./MusicToggler";
const Header = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logo">
        <img
          src={logo}
          alt="logo"
          height={"70px"}
          width={"70px"}
          style={{ borderRadius: "50%" }}
          onClick={() => toHome()}
        />
      </div>
      <div style={{ textAlign: "left", fontSize: "40px" }}>Touch Typing</div>
      <div className="music-toggle">
        <MusicToggler />
      </div>
      <div className="user-icon">
        <AccountCircle />
      </div>
    </div>
  );
};

export default Header;
