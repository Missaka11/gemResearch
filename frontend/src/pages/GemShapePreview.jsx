import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/GemShapePreview.css";
import { Header } from "../components/Header";

const GemShapePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageDataUrl } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Handle API request to send image to backend for classification
  const handleUploadGem = async () => {
    if (!imageDataUrl) {
      setError("No image to upload.");
      return;
    }

    const formData = new FormData();
    // Convert image data URL to a Blob (image file)
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();
    formData.append("imagefile", blob, "gem.jpg");

    setLoading(true);
    setError(null);

    try {
      // Send the image to backend for prediction
      const apiResponse = await axios.post(
        "http://127.0.0.1:5005/predict-gem",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(apiResponse.data);
      setPrediction(apiResponse.data);

      setLoading(false);

      // Navigate to the result page with the prediction and imageDataUrl
      navigate("/GemShapeResult", {
        state: { prediction: apiResponse.data, imageDataUrl },
      });
    } catch (err) {
      setLoading(false);
      setError("Failed to classify the gem. Please try again.");
    }
  };

  const handleCaptureClick = () => {
    navigate("/GemShapeCapture/LiveReviewGemShape");
  };

  return (
    <>
      <Header />
      <div className="preview-container">
        <h2 className="topic-gs">Captured Image</h2>
        {imageDataUrl ? (
          <img
            src={imageDataUrl}
            alt="Captured Gem"
            className="captured-image"
          />
        ) : (
          <p>No image captured.</p>
        )}

        <div className="button-container">
          <button className="upload-button-2" onClick={handleCaptureClick}>
            Retake Image
          </button>
          <button
            className="upload-button"
            onClick={handleUploadGem}
            disabled={loading}
          >
            {" "}
            {loading ? "Uploading..." : "Upload Gem"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {prediction && (
          <div className="prediction-container">
            <h2>Predicted Gem Shape: {prediction}</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default GemShapePreview;
