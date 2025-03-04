import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

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
    <div className="container">
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
          <button onClick={capture}>Capture photo</button>
        </>
      )}
    </div>
  );
};

export default WebCamera;
