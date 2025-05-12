import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from "../components/Header";
import { FooterComp } from "../components/FooterComp";
import "../styles/gemIdentificationResults.css";

const GemIdentificationResults = () => {
  const location = useLocation();
  const { image, analysisResult } = location.state || {};

  const label = analysisResult?.label || 'Unknown';
  const confidence = analysisResult?.confidence || 0;
  const segmented_image = analysisResult?.segmented_image;
  const originalImage = image || '';
  const message = analysisResult?.message;

  return (
    <>
      <Header />
      <div className="gem-results-container">
        <div className="results-content">
          <div className="results-header">
            <div className="title-container">
              <h1 className="results-title">Gem Analysis Results</h1>
              <p className="results-subtitle">Detailed analysis of your gemstone</p>
              <div className="gem-icon-container">
                <span className="gem-icon">💎</span>
              </div>
            </div>
          </div>

          <div className="results-section">
            <div className="gem-identification-section">
              <div className="gem-type-badge">
                <span className="gem-type-text">{label}</span>
              </div>

              <div className="confidence-section">
                <div className="confidence-title">Confidence Score</div>
                <div className="confidence-progress">
                  <div
                    className="confidence-bar"
                    style={{ width: `${confidence * 100}%` }}
                  >
                    <span className="confidence-value">{confidence * 100}%</span>
                  </div>
                </div>
                <div className="confidence-description">
                  {(confidence * 100) >= 90 ? 'Highly Confident' :
                   (confidence * 100) >= 70 ? 'Moderately Confident' :
                   (confidence * 100) >= 50 ? 'Somewhat Confident' :
                   'Low Confidence'}
                </div>
              </div>
            </div>

            <div className="image-comparison-section">
              <div className="image-comparison">
                <div className="image-item original">
                  <div className="image-label-container">
                    <div className="image-label-icon">🖼️</div>
                    <div className="image-label-text">Original Image</div>
                  </div>
                  <img
                    src={originalImage}
                    alt="Original Gem"
                    className="result-image"
                  />
                </div>
                <div className="image-item segmented">
                  <div className="image-label-container">
                    <div className="image-label-icon">🔍</div>
                    <div className="image-label-text">Segmented Image</div>
                  </div>
                  <img
                    src={`data:image/png;base64,${segmented_image}`}
                    alt="Segmented Gem"
                    className="result-image"
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className="message-section">
                <div className="message-info">
                  <p>{message}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
};

export default GemIdentificationResults;
