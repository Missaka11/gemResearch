import { useState, useEffect, React } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/GemShapePreview.css";
import { Header } from "../components/Header";

const GemShapeResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, imageDataUrl } = location.state || {}; // Retrieve prediction and image URL from state

  // Function to navigate to the 3D model view page
  const handleCardClick = (item) => {
    navigate("/ThreeDModelView", { state: { item, prediction } });
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll to next section (one screen height)
      behavior: "smooth", // Smooth scrolling
    });
  };

  const getCardDescription = (item) => {
    switch (item) {
      case "Earrings":
        return "A pair of jewelry worn on the ears to enhance beauty.";
      case "Necklace":
        return "A piece of jewelry worn around the neck, often decorated with pendants.";
      case "Ring":
        return "A round band worn on the finger, often used as a symbol of commitment.";
      case "Bracelet":
        return "A piece of jewelry worn around the wrist, adding elegance and style.";
      default:
        return "";
    }
  };

  return (
    <>
      <Header />
      <div className="result-container">
        <h1 className="title">Gem Shape Classification Result</h1>
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt="Captured Gem"
            className="captured-image"
          />
        ) : (
          <p>No image available.</p>
        )}
        {prediction ? (
          <div className="result">
            <h2>
              Your Gem Shape <br />
              <span style={{ color: "red", fontSize: "60px" }}>
                {prediction}
              </span>
            </h2>
          </div>
        ) : (
          <p>No prediction available. Please try uploading an image first.</p>
        )}

        <div className="quote-section">
          <p className="quote-text">
            Click below to explore stunning 3D models of <br />
            <b> your favourite jewelry items!</b>
          </p>
        </div>

        <button className="scroll-down-btn" onClick={handleScrollDown}>
          SCROLL DOWN<span className="down-arrow">↓</span>
        </button>
      </div>
      {/* Synonyms Section */}
      <div className="synonyms-section">
        <h1 className="synonyms-topic">Synonyms</h1>
        <p className="d-models-info">
          Explore our stunning 3D models of earrings, necklaces, rings, and
          bracelets! Click on any of the jewelry items above to watch these
          items come to life in breathtaking 3D detail. Discover how these
          pieces look from every angle and envision them as part of your
          collection.
        </p>
        <div className="cards-container">
          {/* Synonyms Cards */}
          {["Earrings", "Necklace", "Ring", "Bracelet"].map((item) => (
            <div
              key={item}
              className="synonym-card"
              onClick={() => handleCardClick(item)}
            >
              <img
                src={`/src/assets/images/${item.toLowerCase()}.jpg`}
                alt={item}
                className="card-image"
              />
              <h3>{item}</h3>
              <p className="card-description">{getCardDescription(item)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GemShapeResult;
