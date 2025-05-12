import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/images/background-image.jpg";
import humanImage from "../assets/images/human-2.png";
import { Header } from "../components/Header";
import { FooterComp } from "../components/FooterComp";
import "../styles/gemIdentification.css";
import "../styles/gemIdentificationUpload.css";

const GemIdentification = ({ setPath = ({}) => {} }) => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div
        className="gem-identification-container"
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden"
        }}
      >
        <img
          className="background-image"
          src={Background}
          alt="Background 1"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1
          }}
        />
        <div
          className="gem-content"
          style={{
            position: "relative",
            padding: "2rem",
            display: "flex"
          }}
        >
          <div className="text-section gem-text-section">
            <h1 className="gem-title" data-aos="fade-up">
              Identify Your
              <br />
              <span className="gem-highlight">Gem</span> !
            </h1>
            <p className="gem-description" data-aos="fade-up" data-aos-delay="100">
              Curious about the authenticity of your gemstone? Our advanced
              tool helps you capture, analyze, and verify your gem’s unique
              features with precision. Start your gem identification journey
              now.
            </p>

            <button
              onClick={() => {
                navigate("/GemIdentificationUpload");
              }}
              className="gem-capture-btn"
            >
              Upload the Image
            </button>
          </div>
          <div className="image-section gem-image-section">
            <img
              src={humanImage}
              className="human-image"
              alt="Human Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                transition: "transform 0.3s ease-in-out"
              }}
            />
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
};

export default GemIdentification;
