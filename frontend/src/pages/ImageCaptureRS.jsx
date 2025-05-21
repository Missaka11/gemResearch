import React, { useEffect, useState, useRef } from "react";
import UploadImageComp from "../components/UploadImageComp"; // Updated import
import ImageCrop from "../components/ImageCrop";
import "../styles/CameraAndCropApp.css";
import { Header } from "../components/Header";
import "../styles/ImageCaptureRS.css";
import { FooterComp } from "../components/FooterComp";
import Button from "react-bootstrap/Button";

const ImageCaptureRS = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progressAnimationRef = useRef(null);

  const handleFileCapture = (imageSrc) => {
    setUploadedImage(imageSrc);
    setCroppedImage(null);
    setIsCropping(true);
    setPredictionResult(null);
  };

  const handleRetake = () => {
    setUploadedImage(null);
    setCroppedImage(null);
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

  const handleCropDone = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl);
    setIsCropping(false);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setAnimatedProgress(0);

    try {
      // Use the cropped image if available, otherwise use the uploaded image
      const imageToUpload = croppedImage || uploadedImage;

      // Convert the image to a Blob
      const response = await fetch(imageToUpload);
      const blob = await response.blob();

      // Create a FormData object and append the image
      const formData = new FormData();
      formData.append("image", blob, "cropped-image.jpg");

      // Send the image to the Flask API
      const apiResponse = await fetch("http://127.0.0.1:5002/predict", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await apiResponse.json();
      setPredictionResult(result);

      // Check if the image is a gem
      if (result.is_gem === false) {
        // If not a gem, we don't need to animate the progress bar
        // The message will be displayed in the UI
        console.log("Not a gem image:", result.message);
      } else {
        // If it is a gem, animate the progress bar with the confidence value
        const confidenceValue = parseFloat(result.confidence);
        animateProgressBar(confidenceValue);
      }
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

      <div className="content-container">
        {!uploadedImage ? (
          <UploadImageComp onCapture={handleFileCapture} />
        ) : isCropping ? (
          <div className="cropAndUploadSection">
            <ImageCrop
              imageSrc={uploadedImage}
              onCropComplete={handleCropComplete}
              onCropDone={handleCropDone}
            />
            <div className="buttons mt-3 mb-4">
              <Button
                className="rounded-pill"
                variant="outline-primary"
                onClick={handleRetake}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="cropAndUploadSection">
            <div className="cropped-image-container text-center mb-4">
              <h5>Cropped Image:</h5>
              <img
                src={croppedImage}
                alt="Cropped"
                className="cropped-image-preview border border-3 rounded-4"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            </div>
            <div className="buttons mb-4">
              <Button
                className="rounded-pill"
                variant="outline-primary"
                onClick={handleRetake}
              >
                Upload New Image
              </Button>
              <Button
                className="rounded-pill ms-2"
                variant="outline-secondary"
                onClick={() => setIsCropping(true)}
              >
                Re-crop
              </Button>
              <Button
                className="rounded-pill ms-2"
                variant="success"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Identifying..." : "Identify"}
              </Button>
            </div>
            {predictionResult ? (
              <div className="predictionResult">
                {predictionResult.is_gem === false ? (
                  <div className="alert alert-warning">
                    <h4 className="alert-heading">Not a Gem Image</h4>
                    <p>{predictionResult.message}</p>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
      <FooterComp />
    </main>
  );
};

export default ImageCaptureRS;
