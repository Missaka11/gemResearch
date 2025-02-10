import React from "react";
import "../styles/Webintro.css";

const WebIntroSection = () => {
  return (
    <section
      className="hero section mt-5"
      data-builder="section"
      data-colorpreset="cp-light-background"
    >
      <div className="container">
        <div className="row gy-4 justify-content-center justify-content-lg-between">
          <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">
              Value Your
              <br />
              Gem !
            </h1>
            <p data-aos="fade-up" data-aos-delay="100">
              Discover the true value of your precious gems with our expert
              services.
            </p>
            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
              <a href="#book-a-table" className="btn-get-started">
                Get service now
              </a>
            </div>
          </div>
          <div
            className="col-lg-5 order-1 order-lg-2 hero-img"
            data-aos="zoom-out"
          >
            <img
              src="https://img.freepik.com/free-photo/fun-3d-cartoon-illustration-indian-businessman_183364-114448.jpg?t=st=1739223069~exp=1739226669~hmac=de21ba462eefbba8d40c628dc73853b51252759d5821af41d7cc9b24df4df947&w=740"
              className="img-fluid animated"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebIntroSection;
