import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import "../styles/LiveReviewGemShape.css";
import { Header } from "../components/Header";

const LiveReviewGemShape = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setCroppedImage(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target.result);
        setIsCropping(true); // Start cropping mode when image is loaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop complete
  const onCropComplete = (croppedArea, croppedAreaPixelsData) => {
    setCroppedAreaPixels(croppedAreaPixelsData);
  };

  // Create the cropped image
  const createCroppedImage = async () => {
    if (!croppedAreaPixels || !previewSrc) return;

    const image = new Image();
    image.src = previewSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size to the cropped area
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        // Draw the cropped image
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  // Apply the crop
  const handleApplyCrop = async () => {
    const croppedImageUrl = await createCroppedImage();
    setCroppedImage(croppedImageUrl);
    setIsCropping(false);
  };

  // Cancel cropping
  const handleCancelCrop = () => {
    setIsCropping(false);
    if (!croppedImage) {
      // If no cropped image exists, reset everything
      setPreviewSrc(null);
      setSelectedImage(null);
    }
  };

  // Reset and upload a new image
  const handleReset = () => {
    setSelectedImage(null);
    setPreviewSrc(null);
    setCroppedImage(null);
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Process the selected image
  const handleProcessImage = () => {
    if (!croppedImage && !previewSrc) {
      alert("Please select an image first");
      return;
    }

    // Use the cropped image if available, otherwise use the original preview
    const imageToProcess = croppedImage || previewSrc;

    // Navigate to preview page with the image data
    navigate("/GemShapePreview", { state: { imageDataUrl: imageToProcess } });
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <h2>Upload Image for Shape Analysis</h2>

        <div className="file-upload-section">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />

          <button
            className="styled-button browse-button"
            onClick={handleBrowseClick}
          >
            Browse Images
          </button>

          <div className="file-name">
            {selectedImage ? selectedImage.name : "No file selected"}
          </div>
        </div>

        {isCropping && previewSrc ? (
          <div className="crop-container">
            <div
              style={{ position: "relative", height: "400px", width: "100%" }}
            >
              <Cropper
                image={previewSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="crop-controls">
              <div className="zoom-control">
                <label>Zoom: {zoom.toFixed(1)}x</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                />
              </div>

              <div className="crop-buttons">
                <button
                  className="styled-button cancel-button"
                  onClick={handleCancelCrop}
                >
                  Cancel
                </button>
                <button
                  className="styled-button apply-button"
                  onClick={handleApplyCrop}
                >
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="preview-container">
            {croppedImage ? (
              <div className="image-preview">
                <h3>Cropped Preview</h3>
                <img
                  src={croppedImage}
                  alt="Cropped Preview"
                  className="preview-image"
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
                <div className="image-actions">
                  <button
                    className="styled-button recrop-button"
                    onClick={() => setIsCropping(true)}
                  >
                    Re-crop
                  </button>
                  <button
                    className="styled-button reset-button"
                    onClick={handleReset}
                  >
                    Upload New
                  </button>
                </div>
              </div>
            ) : previewSrc ? (
              <div className="image-preview">
                <h3>Preview</h3>
                <img
                  src={previewSrc}
                  alt="Preview"
                  className="preview-image"
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
                <div className="image-actions">
                  <button
                    className="styled-button crop-button"
                    onClick={() => setIsCropping(true)}
                  >
                    Crop
                  </button>
                  <button
                    className="styled-button reset-button"
                    onClick={handleReset}
                  >
                    Upload New
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-preview">
                <p>Image preview will appear here</p>
              </div>
            )}

            {/* Hidden canvas for image processing */}
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>
        )}

        <button
          className="styled-button process-button"
          onClick={handleProcessImage}
          disabled={!previewSrc}
        >
          Process Image
        </button>
      </div>
    </>
  );
};

export default LiveReviewGemShape;