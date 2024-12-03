import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const prediction = location.state?.prediction;

  return (
    <div>
      <h1>Prediction Result</h1>
      {prediction ? (
        <div>
          <h2>Predicted Gem Shape: {prediction}</h2>
        </div>
      ) : (
        <p>No prediction available. Go back and try again.</p>
      )}
    </div>
  );
};

export default Result;
