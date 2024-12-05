import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Livereview.css';

const Livereview = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Get the list of all available cameras
  useEffect(() => {
    const getCameras = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setCameras(videoDevices);
      
      // Automatically select the first camera (optional)
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    };

    getCameras();
  }, []);

  // Start the webcam with selected camera
  useEffect(() => {
    if (selectedCamera && videoRef.current) {
      const constraints = {
        video: { deviceId: { exact: selectedCamera } }
      };
      
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    }
  }, [selectedCamera]);

  // Handle changing the selected camera
  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  // Capture the image from the video
  const handleCaptureClick = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Draw the current frame from the video onto the canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    // Get the image data URL and navigate to preview page
    const imageDataUrl = canvas.toDataURL('image/jpg');
    navigate('/preview', { state: { imageDataUrl } });
  };

  return (
    <div className="home-container">
      <h2>Select Camera</h2>
      <select onChange={handleCameraChange}>
        {cameras.map((camera, index) => (
          <option key={index} value={camera.deviceId}>
            {camera.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select>

      <div className="webcam-container">
        {/* Display video stream */}
        <video ref={videoRef} autoPlay width="100%" height="auto"></video>
        <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      </div>

      <button className="styled-button" onClick={handleCaptureClick}>Capture Image</button>
    </div>
  );
};

export default Livereview;
