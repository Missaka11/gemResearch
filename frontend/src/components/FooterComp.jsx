import React from "react";
import "../styles/FooterComp.css";

export const FooterComp = () => {
  return (
    <div className="footer mt-auto">
      <div className="footer-emailDiv">gemoraworld@gmail.com</div>
      <div className="pt-3 pb-3 footer-contentDiv">
        <div className="footer-linksDiv row">
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item footer-items fs-6 fw-bold">
                Company
              </li>
              <li className="list-group-item footer-items">About</li>
              <li className="list-group-item footer-items">FAQs</li>
              <li className="list-group-item footer-items">Contact</li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item footer-items fs-6 fw-bold">
                Get help
              </li>
              <li className="list-group-item footer-items">
                Gem Identification
              </li>
              <li className="list-group-item footer-items">
                Gem Classification
              </li>
              <li className="list-group-item footer-items">Jewelry Designs</li>
              <li className="list-group-item footer-items">
                Designs Your Own Jewelry
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item footer-items fs-6 fw-bold">
                Follow Us
              </li>
              <li className="list-group-item footer-items">About</li>
              <li className="list-group-item footer-items">FAQs</li>
              <li className="list-group-item footer-items">Contact</li>
            </ul>
          </div>
          <div className="col-sm-3">
            <img src="https://i.imgur.com/WHoCqFA.png" alt="Logo" />
          </div>
        </div>
      </div>
      <div className="footer-copyrigitDiv text-center border-top border-secondary">
        © Gemora
      </div>
    </div>
  );
};
