// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/LiveReviewGemShape.css";
// import { Header } from "../components/Header";

// const LiveReviewGemShape = () => {
//   const [cameras, setCameras] = useState([]);
//   const [selectedCamera, setSelectedCamera] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   // Get the list of all available cameras
//   useEffect(() => {
//     const getCameras = async () => {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const videoDevices = devices.filter(
//         (device) => device.kind === "videoinput"
//       );
//       setCameras(videoDevices);

//       // Automatically select the first camera (optional)
//       if (videoDevices.length > 0) {
//         setSelectedCamera(videoDevices[0].deviceId);
//       }
//     };

//     getCameras();
//   }, []);

//   // Start the webcam with selected camera
//   useEffect(() => {
//     if (selectedCamera && videoRef.current) {
//       const constraints = {
//         video: { deviceId: { exact: selectedCamera } },
//       };

//       navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch((err) => {
//           console.error("Error accessing webcam: ", err);
//         });
//     }
//   }, [selectedCamera]);

//   // Handle changing the selected camera
//   const handleCameraChange = (event) => {
//     setSelectedCamera(event.target.value);
//   };

//   // Capture the image from the video
//   const handleCaptureClick = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     // Draw the current frame from the video onto the canvas
//     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     // Get the image data URL and navigate to preview page
//     const imageDataUrl = canvas.toDataURL("image/jpg");
//     navigate("/GemShapePreview", { state: { imageDataUrl } });
//   };

//   return (
//     <>
//       <Header />
//       <div className="home-container">
//         <h2>Select Camera For Capture</h2>
//         <select onChange={handleCameraChange}>
//           {cameras.map((camera, index) => (
//             <option key={index} value={camera.deviceId}>
//               {camera.label || `Camera ${index + 1}`}
//             </option>
//           ))}
//         </select>

//         <div className="webcam-container">
//           {/* Display video stream */}
//           <video ref={videoRef} autoPlay width="100%" height="auto"></video>
//           <canvas
//             ref={canvasRef}
//             width="640"
//             height="480"
//             style={{ display: "none" }}
//           ></canvas>
//         </div>

//         <button className="styled-button" onClick={handleCaptureClick}>
//           Capture Image
//         </button>
//       </div>
//     </>
//   );
// };

// export default LiveReviewGemShape;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LiveReviewGemShape.css";
import { Header } from "../components/Header";

const LiveReviewGemShape = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Function to stop all tracks of the stream
  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
  };

  // Get the list of all available cameras
  useEffect(() => {
    const getCameras = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setCameras(videoDevices);

      // Automatically select the first camera (optional)
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    };

    getCameras();

    // Cleanup function to ensure camera is turned off when component unmounts
    return () => {
      stopMediaTracks();
    };
  }, []);

  // Start the webcam with selected camera
  useEffect(() => {
    if (selectedCamera && videoRef.current) {
      // Stop any existing stream before starting a new one
      stopMediaTracks();

      const constraints = {
        video: { deviceId: { exact: selectedCamera } },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          // Store the stream reference so we can stop it later
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    }

    // Cleanup function to ensure camera is turned off when selected camera changes
    return () => {
      stopMediaTracks();
    };
  }, [selectedCamera]);

  // Handle changing the selected camera
  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  // Capture the image from the video
  const handleCaptureClick = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Draw the current frame from the video onto the canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Get the image data URL
    const imageDataUrl = canvas.toDataURL("image/jpg");

    // Stop camera before navigating
    stopMediaTracks();

    // Navigate to preview page
    navigate("/GemShapePreview", { state: { imageDataUrl } });
  };

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Stop the camera when the page is not visible
        stopMediaTracks();
      } else if (!streamRef.current && selectedCamera) {
        // Restart the camera when the page becomes visible again
        const constraints = {
          video: { deviceId: { exact: selectedCamera } },
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            streamRef.current = stream;
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => {
            console.error("Error accessing webcam: ", err);
          });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [selectedCamera]);

  return (
    <>
      <Header />
      <div className="home-container">
        <h2>Select Camera For Capture</h2>
        <select onChange={handleCameraChange} value={selectedCamera || ""}>
          {cameras.map((camera, index) => (
            <option key={index} value={camera.deviceId}>
              {camera.label || `Camera ${index + 1}`}
            </option>
          ))}
        </select>

        <div className="webcam-container">
          {/* Display video stream */}
          <video ref={videoRef} autoPlay width="100%" height="auto"></video>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          ></canvas>
        </div>

        <button className="styled-button" onClick={handleCaptureClick}>
          Capture Image
        </button>
      </div>
    </>
  );
};

export default LiveReviewGemShape;
