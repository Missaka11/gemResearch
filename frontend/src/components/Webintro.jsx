// filepath: /Users/gevindu/SLIIT/Research /gemResearch/frontend/src/components/Webintro.jsx
import React from "react";
import "../styles/Webintro.css";
import DollermanImage from '../assets/images/Dollerman.png';
import { Link } from "react-router-dom";

const Webintro = () => {
  return (
    <section
      className="hero section"
      data-builder="section"
      data-colorpreset="cp-light-background"
    >
      <div className="container">
        <div className="row gy-4 justify-content-center justify-content-lg-between">
          <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">
              Value Your Gem !
            </h1>
            <p data-aos="fade-up" data-aos-delay="100">
              Discover the true value of your precious gems with our expert
              services.
            </p>
            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
              <Link href="#book-Link-table" className="btn-get-started">
                Get service now
              </Link>
            </div>
          </div>
          <div
            className="col-lg-5 order-1 order-lg-2 hero-img"
            data-aos="zoom-out">
            <img src={DollermanImage} className="img-fluid animated"  alt="Hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Webintro;
