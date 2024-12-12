import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Preview.css';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, imageDataUrl } = location.state || {}; // Retrieve prediction and image URL from state

  // Function to navigate to the 3D model view page
  const handleCardClick = (item) => {
    navigate('/3d-view', { state: { item, prediction  } });
  };

  return (
    <div className="result-container">
      <h1 className="title">Gem Classification Result</h1>
      {imageDataUrl ? (
        <img src={imageDataUrl} alt="Captured Gem" className="captured-image" />
      ) : (
        <p>No image available.</p>
      )}
      {prediction ? (
        <div className="result">
          <h2>Your Gem Shape: <span style={{ color: 'green' }}>{prediction}</span></h2>
        </div>
      ) : (
        <p>No prediction available. Please try uploading an image first.</p>
      )}

      {/* Synonyms Section */}
      <div className="synonyms-section">
        <h2>Synonyms</h2>
        <div className="cards-container">
          {/* Synonyms Cards */}
          {['Earrings', 'Necklace', 'Ring', 'Bracelet'].map((item) => (
            <div
              key={item}
              className="synonym-card"
              onClick={() => handleCardClick(item)}
            >
              <img
                src={require(`../assets/${item.toLowerCase()}.jpg`)}
                alt={item}
                className="card-image"
              />
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
