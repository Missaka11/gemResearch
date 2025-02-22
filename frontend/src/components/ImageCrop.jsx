import React from "react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import "../styles/ImageCapture.css";

const ImageCrop = () => {
  const [crop, setCrop] = useState({ x: 1, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  return (
    <div>
      <h2>Image cropping </h2>
      <div className="imageCropperDiv mx-auto">
        <Cropper
          image={
            "https://cdn.pixabay.com/photo/2024/12/09/05/57/girl-9254216_1280.jpg"
          }
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
