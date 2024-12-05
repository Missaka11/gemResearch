import React from 'react';
import { useLocation } from 'react-router-dom';
import './Preview.css';

const ResultPage = () => {
  const location = useLocation();
  const { prediction } = location.state || {};  // Retrieve prediction from state

  return (
    <div className="result-container">
      <h1 className="title">Gem Classification Result</h1>
      {prediction ? (
        <div className="result">
          <h2>Predicted Gem Shape: {prediction}</h2>
        </div>
      ) : (
        <p>No prediction available. Please try uploading an image first.</p>
      )}
    </div>
  );
};

export default ResultPage;
