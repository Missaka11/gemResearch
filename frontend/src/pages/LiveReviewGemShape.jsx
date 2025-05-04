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
  const handleProcessImage = async () => {
    if (!croppedImage && !previewSrc) {
      alert("Please select an image first");
      return;
    }
  
    const imageToProcess = croppedImage || previewSrc;
  
    try {
      // Directly navigate to the next page with the selected image
      navigate("/GemShapePreview", { state: { imageDataUrl: imageToProcess } });
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to proceed with the selected image.");
    }
  };
  
  return (
    <>
      <Header />
      <div className="home-container">
        <h2>Upload Image for Shape Analysis</h2>

        {/* File Upload Section */}
        {!previewSrc && !croppedImage && (
          <div className="file-upload-section">
            <div className="drag-drop-zone" onClick={handleBrowseClick}>
              <p>Drag and drop an image here, or click to browse</p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            
            <div className="file-upload-row">
              <button
                className="styled-button browse-button"
                onClick={handleBrowseClick}
              >
                Browse
              </button>
              <div className="file-name">
                {selectedImage ? selectedImage.name : "No file selected"}
              </div>
            </div>
          </div>
        )}

        {/* Image Preview and Crop Section */}
        {isCropping && previewSrc && !croppedImage && (
          <div className="crop-container">
            <div
              style={{ position: "relative", height: "300px", width: "100%" }}
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
                  max={8}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                />
              </div>

              <div className="crop-buttons">
                <button
                  className="styled-button-2 cancel-button"
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
        )}

        {/* Cropped Image Preview and Additional Actions */}
        {croppedImage && (
          <div className="image-preview">
            <h6>Cropped Preview</h6>
            <img
              src={croppedImage}
              alt="Cropped Preview"
              className="preview-image"
              style={{ maxWidth: "600px", maxHeight: "400px" }}
            />
            <div className="image-actions">
              <button
                className="styled-button-3 recrop-button"
                onClick={() => setIsCropping(true)}
              >
                Re-crop
              </button>
              <button
                className="styled-button-2 reset-button"
                onClick={handleReset}
              >
                Upload New
              </button>
              <button
                className="styled-button process-button"
                onClick={handleProcessImage}
              >
                Process Image
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LiveReviewGemShape;
