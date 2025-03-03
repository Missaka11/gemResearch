import React from "react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import "../styles/ImageCapture.css";

const ImageCrop = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div>
      <h2>Image Cropping</h2>
      <div className="imageCropperDiv mx-auto">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  );
};

export default ImageCrop;