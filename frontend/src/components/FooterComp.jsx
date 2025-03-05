import React from "react";
import "../styles/FooterComp.css";

export const FooterComp = () => {
  return (
    <footer>
      <div className="footer-emailDiv border-bottom">
        <span>gemora.gem@gmail.com</span>
      </div>
      <div>
        <span>Sample text</span>
      </div>
      <div className="footer-copyrigitDiv">
        <span>© 2021 Gemora</span>
      </div>
    </footer>
  );
};
