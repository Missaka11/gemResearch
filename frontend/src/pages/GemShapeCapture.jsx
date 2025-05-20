import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./../styles/GemShapeCapture.css";
import DollermanImage from "../assets/images/Dollerman.png";
import { Header } from "../components/Header";
// import { FooterComp } from "../components/FooterComp";

const GemShapeCapture = () => {
  const navigate = useNavigate();

  // const handleCaptureClick = () => {
  //   navigate('/live-review');
  // };

  return (
    <>
      <Header />
      <div
        className="hero section"
        data-builder="section"
        data-colorpreset="cp-light-background"
      >
        <div className="container">
          <div className="row gy-4 justify-content-center justify-content-lg-between">
            <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">
                Identify Your <br />
                Gem Shape
              </h1>
              <p data-aos="fade-up" data-aos-delay="100">
                Our cutting-edge gem shape classifier offers an easy and
                accurate way to identify the unique shape of your gemstones.
                Simply upload an image, and let our advanced technology analyze
                its features to determine whether it's{" "}
                <b>
                  Round , Oval , Pear , Heart , Square , Triangle , Marquise
                </b>{" "}
                or any other popular gem shapes. Start your gem classification
                journey today and unlock the secrets of your precious stones
                with precision.
              </p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <Link to={"./LiveReviewGemShape"} className="btn-get-started">
                  Capture the Image
                </Link>
              </div>
            </div>
            <div
              className="col-lg-5 order-1 order-lg-2 hero-img"
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
      {/* <FooterComp /> */}
    </>
  );
};

export default GemShapeCapture;
