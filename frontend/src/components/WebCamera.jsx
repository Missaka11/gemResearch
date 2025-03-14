import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/WebCamera.css";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebCamera = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  const handleDevices = React.useCallback(
    (mediaDevices) => {
      // Filter only video input devices
      const videoDevices = mediaDevices.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);

      // Set first device as default if available and no device is selected yet
      if (videoDevices.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    },
    [selectedDeviceId]
  );

  // Get connected devices when component mounts
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    onCapture(imageSrc);
  };

  const retake = () => {
    setImgSrc(null);
  };

  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
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
          <div className="camera-controls mb-2 mt-3">
            <Form.Select
              onChange={handleDeviceChange}
              value={selectedDeviceId}
              className="camera-select mb-2"
              aria-label="Select camera device"
            >
              {devices.map((device, key) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label || `Camera ${key + 1}`}
                </option>
              ))}
            </Form.Select>
          </div>

          <Webcam
            className="webcam-capture col-md-6 border border-3 rounded-4"
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={{
              ...videoConstraints,
              deviceId: selectedDeviceId
                ? { exact: selectedDeviceId }
                : undefined,
            }}
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
