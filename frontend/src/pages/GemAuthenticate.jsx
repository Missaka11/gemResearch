import React, { useEffect } from "react";
import DollermanImage from "../assets/images/Dollerman.png";
import { Header } from "../components/Header";
import { FooterComp } from "../components/FooterComp";
import { NavLink } from "react-router-dom";

const GemAuthenticate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div
        className="hero section"
        data-builder="section"
        data-colorpreset="cp-light-background"
      >
        <div className="container">
          <div className="row justify-content-center justify-content-lg-between">
            <div className="col-lg-5 order-1 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">
                Identify Your <br />
                Gem Real or Synthetic
              </h1>
              <p data-aos="fade-up" data-aos-delay="100">
                Discover the authenticity of your gemstones with our advanced
                gem identification model. Simply upload an image, and our
                cutting-edge technology will analyze its features to determine
                if your gem is natural or synthetic. Whether it's a Round, Oval,
                Pear, Heart, Square, Triangle, Marquise, or any other popular
                shape, our tool provides accurate and reliable results. Start
                your gemstone verification journey today and gain confidence in
                the value of your precious stones.
              </p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <NavLink to={"./ImageCaptureRS"} className="btn-get-started">
                  Capture the Image
                </NavLink>
              </div>
            </div>
            <div
              className="col-lg-5 order-2 order-lg-2 hero-img"
              data-aos="zoom-out"
            >
              <img
                src={DollermanImage}
                className="img-fluid animated"
                alt="Hero"
              />
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
};

export default GemAuthenticate;
