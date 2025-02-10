import React from "react";
import Logo from "../assets/images/logo.png";

export const Header = () => {
  return (
    <div>
      <img src={Logo} className="header-logo" />
    </div>
  );
};
