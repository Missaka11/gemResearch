import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate(); 

  const handleCaptureClick = () => {
    navigate('/live-review');
  };

  return (
    <div className="home-container">
      {/* Add Image */}
      <img src={require('../assets/home-page.png')} alt="Gem" className="gem-image" />

      <button className="styled-button" onClick={handleCaptureClick}>Capture the Gem</button>
    </div>
  );
};

export default Home;
