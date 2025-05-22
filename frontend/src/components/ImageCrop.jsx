import React from "react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import "../styles/ImageCapture.css";
import Button from "react-bootstrap/Button";

const ImageCrop = ({ imageSrc, onCropComplete, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    onCropComplete(croppedArea, croppedAreaPixels);
  };

  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  const handleDone = () => {
    if (onCropDone && croppedAreaPixels) {
      createCroppedImage(imageSrc, croppedAreaPixels).then((croppedImage) => {
        onCropDone(croppedImage);
      });
    }
  };

  // Function to generate actual cropped image from the cropped area
  const createCroppedImage = async (imageSrc, pixelCrop) => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  return (
    <div>
      <div
        className="imageCropperDiv mx-auto"
        style={{ width: "43rem", height: "25rem", position: "relative" }}
      >
        <Cropper
          style={{ borderRadius: "1rem" }}
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={handleZoomChange}
        />
      </div>
      <div className="slider-container-for-cropImage col-md-5 mt-3 mb-3  mx-auto">
        <label htmlFor="zoom-slider">Zoom: {zoom.toFixed(1)}x</label>
        <input
          id="zoom-slider"
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={zoom}
          onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
          className="form-range"
        />
      </div>
      <div className="justify-content-center d-flex">
        <Button
          className="rounded-pill crop-button"
          variant="primary"
          onClick={handleDone}
        >
          Apply Crop
        </Button>
      </div>
    </div>
  );
};

export default ImageCrop;
