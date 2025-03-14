import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
import WebCamera from "../components/WebCamera";
import ImageCrop from "../components/ImageCrop";
import "../styles/CameraAndCropApp.css";
import { Header } from "../components/Header";
import GemCapture from "../assets/images/gemCapture5.png";
import "../styles/ImageCaptureRS.css";
import { FooterComp } from "../components/FooterComp";
import Button from "react-bootstrap/Button";

const ImageCaptureRS = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [categories, setCategories] = useState([]);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progressAnimationRef = useRef(null);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    setIsCropping(true);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCropping(false);
    setPredictionResult(null);
    setAnimatedProgress(0);
    if (progressAnimationRef.current) {
      clearTimeout(progressAnimationRef.current);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log("Cropped Area:", croppedArea);
    console.log("Cropped Area Pixels:", croppedAreaPixels);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setAnimatedProgress(0);

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

      // Start the progress animation after getting results
      animateProgressBar(result.confidence);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Function to animate the progress bar
  const animateProgressBar = (targetValue) => {
    // Parse the confidence value to a number
    const targetPercentage = parseFloat(targetValue);
    if (isNaN(targetPercentage)) return;

    // Reset animation state
    setAnimatedProgress(0);
    if (progressAnimationRef.current) {
      clearTimeout(progressAnimationRef.current);
    }

    // Animation duration and steps
    const animationDuration = 1500; // 1.5 seconds
    const steps = 60; // 60 frames for smooth animation
    const stepDuration = animationDuration / steps;
    const increment = targetPercentage / steps;

    // Animation function
    const animate = (currentStep) => {
      if (currentStep <= steps) {
        setAnimatedProgress(
          Math.min(currentStep * increment, targetPercentage)
        );
        progressAnimationRef.current = setTimeout(() => {
          animate(currentStep + 1);
        }, stepDuration);
      }
    };

    // Start animation
    animate(1);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressAnimationRef.current) {
        clearTimeout(progressAnimationRef.current);
      }
    };
  }, []);

  return (
    <main className="imageCaptureMainDiv">
      <Header />

      <div>
        <div>
          <img
            src={GemCapture}
            className="cameraSection-image"
            alt="Gem Capture"
          />

          {!capturedImage ? (
            <WebCamera onCapture={handleCapture} />
          ) : (
            <div className="cropAndUploadSection">
              <ImageCrop
                imageSrc={capturedImage}
                onCropComplete={handleCropComplete}
              />
              <div className="buttons">
                <Button
                  className="rounded-pill"
                  variant="outline-primary"
                  onClick={handleRetake}
                >
                  Retake
                </Button>
                <Button
                  className="rounded-pill"
                  variant="success"
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? "identifying..." : "Identify"}
                </Button>
              </div>
              {predictionResult ? (
                <div className="predictionResult">
                  <h2>Prediction Result</h2>
                  <h5 className="text-center">
                    Predicted Class: {predictionResult.predicted_class}
                  </h5>
                  <span>Confidence: {predictionResult.confidence}</span>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-animated"
                      role="progressbar"
                      style={{
                        width: `${animatedProgress}%`,
                        transition: "width 0.1s ease-in-out",
                      }}
                      aria-valuenow={animatedProgress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {animatedProgress.toFixed(1)}%
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
