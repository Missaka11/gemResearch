import React, { useEffect, useState, useRef } from "react";
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
      const confidenceValue = parseFloat(result.confidence);
      animateProgressBar(confidenceValue);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Function to animate the progress bar with a smoother animation
  const animateProgressBar = (targetValue) => {
    // Parse the confidence value to a number (removing % sign if present)
    const targetPercentage =
      typeof targetValue === "string"
        ? parseFloat(targetValue.replace("%", ""))
        : targetValue;

    if (isNaN(targetPercentage)) return;

    // Reset animation state
    setAnimatedProgress(0);
    if (progressAnimationRef.current) {
      cancelAnimationFrame(progressAnimationRef.current);
    }

    // Use requestAnimationFrame for smoother animation
    const startTime = performance.now();
    const duration = 2000; // 2 seconds for smoother animation

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Easing function for smoother animation (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Calculate current value
      const currentValue = easedProgress * targetPercentage;
      setAnimatedProgress(currentValue);

      if (progress < 1) {
        progressAnimationRef.current = requestAnimationFrame(animate);
      }
    };

    progressAnimationRef.current = requestAnimationFrame(animate);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressAnimationRef.current) {
        cancelAnimationFrame(progressAnimationRef.current);
      }
    };
  }, []);

  return (
    <main className="imageCaptureMainDiv">
      <Header />

      <div>
        <div>
          {/* <img
            src={GemCapture}
            className="cameraSection-image"
            alt="Gem Capture"
          /> */}

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
                        transition: "none", // Remove transition for smoother requestAnimationFrame animation
                      }}
                      aria-valuenow={animatedProgress}
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