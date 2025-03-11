import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import "../styles/WebCamera.css";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebCamera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    onCapture(imageSrc);
  };

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container p-0">
      {imgSrc ? (
        <>
          <img src={imgSrc} alt="webcam" />
          <button onClick={retake}>Retake</button>
        </>
      ) : (
        <>
          <Webcam
            className="webcam-capture col-md-6 border border-3 rounded-4 mt-3"
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <Button
            onClick={capture}
            className="rounded-pill mt-3 ps-3 pe-3 image-capture-button"
            variant="primary"
          >
            Capture photo
          </Button>
        </>
      )}
    </div>
  );
};

export default WebCamera;
