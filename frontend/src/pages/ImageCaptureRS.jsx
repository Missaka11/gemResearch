import React, { useEffect, useState } from "react";
// import axios from "axios";
import WebCamera from "../components/WebCamera";
import ImageCrop from "../components/ImageCrop";
import "../styles/CameraAndCropApp.css";
import { Header } from "../components/Header";
import CanonImage from "../assets/images/CanonImage.png";
import "../styles/ImageCaptureRS.css";
import { FooterComp } from "../components/FooterComp";

const ImageCaptureRS = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    setIsCropping(true);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCropping(false);
    setPredictionResult(null);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log("Cropped Area:", croppedArea);
    console.log("Cropped Area Pixels:", croppedAreaPixels);
  };

  const handleUpload = async () => {
    setIsUploading(true);

    try {
      // Convert the cropped image to a Blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      // Create a FormData object and append the image
      const formData = new FormData();
      formData.append("image", blob, "cropped-image.jpg");

      // Send the image to the Flask API
      const apiResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await apiResponse.json();
      setPredictionResult(result);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="imageCaptureMainDiv">
      <Header />
      <div className="cameraAndCropApp-header">
        <h3>Camera and Crop Application</h3>
      </div>
      <div className="cameraAndCropApp">
        <div>
          <img src={CanonImage} className="cameraSection-image" />

          {!capturedImage ? (
            <WebCamera onCapture={handleCapture} />
          ) : (
            <div className="cropAndUploadSection">
              <ImageCrop
                imageSrc={capturedImage}
                onCropComplete={handleCropComplete}
              />
              <div className="buttons">
                <button onClick={handleRetake}>Retake</button>
                <button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              {predictionResult ? (
                <div className="predictionResult">
                  <h2>Prediction Result</h2>
                  <h5>Predicted Class: {predictionResult.predicted_class}</h5>
                  <span>Confidence: {predictionResult.confidence}</span>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${predictionResult.confidence}` }}
                      aria-valuenow={predictionResult.confidence}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {predictionResult.confidence}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p>All Probabilities:</p>
                    <ul>
                      {Object.entries(predictionResult.all_probabilities).map(
                        ([category, probability]) => (
                          <li key={category}>
                            {category}: {probability}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <FooterComp />
    </main>
  );
};

export default ImageCaptureRS;
