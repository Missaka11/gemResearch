// // import React, { useRef, useState, useEffect } from "react";
// // import Webcam from "react-webcam";
// // import Button from "react-bootstrap/Button";
// // import Form from "react-bootstrap/Form";
// // import "../styles/WebCamera.css";

// // const videoConstraints = {
// //   width: 1280,
// //   height: 720,
// //   facingMode: "user",
// // };

// // const WebCamera = ({ onCapture }) => {
// //   const webcamRef = useRef(null);
// //   const [imgSrc, setImgSrc] = useState(null);
// //   const [devices, setDevices] = useState([]);
// //   const [selectedDeviceId, setSelectedDeviceId] = useState("");

// //   const handleDevices = React.useCallback(
// //     (mediaDevices) => {
// //       // Filter only video input devices
// //       const videoDevices = mediaDevices.filter(
// //         (device) => device.kind === "videoinput"
// //       );
// //       setDevices(videoDevices);

// //       // Set first device as default if available and no device is selected yet
// //       if (videoDevices.length > 0 && !selectedDeviceId) {
// //         setSelectedDeviceId(videoDevices[0].deviceId);
// //       }
// //     },
// //     [selectedDeviceId]
// //   );

// //   // Get connected devices when component mounts
// //   useEffect(() => {
// //     navigator.mediaDevices.enumerateDevices().then(handleDevices);
// //   }, [handleDevices]);

// //   const capture = () => {
// //     const imageSrc = webcamRef.current.getScreenshot();
// //     setImgSrc(imageSrc);
// //     onCapture(imageSrc);
// //   };

// //   const retake = () => {
// //     setImgSrc(null);
// //   };

// //   const handleDeviceChange = (e) => {
// //     setSelectedDeviceId(e.target.value);
// //   };

// //   return (
// //     <div className="container p-0">
// //       {imgSrc ? (
// //         <>
// //           <img src={imgSrc} alt="webcam" />
// //           <button onClick={retake}>Retake</button>
// //         </>
// //       ) : (
// //         <>
// //           <div className="camera-controls mb-2 mt-3">
// //             <Form.Select
// //               onChange={handleDeviceChange}
// //               value={selectedDeviceId}
// //               className="camera-select mb-2"
// //               aria-label="Select camera device"
// //             >
// //               {devices.map((device, key) => (
// //                 <option value={device.deviceId} key={device.deviceId}>
// //                   {device.label || `Camera ${key + 1}`}
// //                 </option>
// //               ))}
// //             </Form.Select>
// //           </div>

// //           <Webcam
// //             className="webcam-capture col-md-6 border border-3 rounded-4"
// //             audio={false}
// //             // height={400}
// //             ref={webcamRef}
// //             screenshotFormat="image/jpeg"
// //             // width={1280}
// //             videoConstraints={{
// //               ...videoConstraints,
// //               deviceId: selectedDeviceId
// //                 ? { exact: selectedDeviceId }
// //                 : undefined,
// //             }}
// //           />

// //           <Button
// //             onClick={capture}
// //             className="rounded-pill mt-3 ps-3 pe-3 image-capture-button mb-4"
// //             variant="primary"
// //           >
// //             Capture photo
// //           </Button>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default WebCamera;

// import React, { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "../styles/WebCamera.css";

// const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: "user",
// };

// const WebCamera = ({ onCapture }) => {
//   const webcamRef = useRef(null);
//   const [imgSrc, setImgSrc] = useState(null);
//   const [devices, setDevices] = useState([]);
//   const [selectedDeviceId, setSelectedDeviceId] = useState("");
//   const [isStreamActive, setIsStreamActive] = useState(false);

//   const handleDevices = React.useCallback(
//     (mediaDevices) => {
//       // Filter only video input devices
//       const videoDevices = mediaDevices.filter(
//         (device) => device.kind === "videoinput"
//       );
//       setDevices(videoDevices);

//       // Set first device as default if available and no device is selected yet
//       if (videoDevices.length > 0 && !selectedDeviceId) {
//         setSelectedDeviceId(videoDevices[0].deviceId);
//       }
//     },
//     [selectedDeviceId]
//   );

//   // Get connected devices when component mounts
//   useEffect(() => {
//     navigator.mediaDevices.enumerateDevices().then(handleDevices);
//   }, [handleDevices]);

//   // Track when stream becomes active
//   useEffect(() => {
//     if (webcamRef.current && webcamRef.current.video) {
//       webcamRef.current.video.onplaying = () => {
//         setIsStreamActive(true);
//       };
//     }
//   }, [webcamRef.current]);

//   // Cleanup function to stop camera when component unmounts
//   useEffect(() => {
//     return () => {
//       // Stop all tracks when component unmounts
//       if (isStreamActive && webcamRef.current && webcamRef.current.video) {
//         const stream = webcamRef.current.video.srcObject;
//         if (stream) {
//           const tracks = stream.getTracks();
//           tracks.forEach((track) => {
//             track.stop();
//           });
//         }
//       }
//     };
//   }, [isStreamActive]);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImgSrc(imageSrc);
//     onCapture(imageSrc);
//   };

//   const retake = () => {
//     setImgSrc(null);
//   };

//   const handleDeviceChange = (e) => {
//     setSelectedDeviceId(e.target.value);
//   };

//   return (
//     <div className="container p-0">
//       {imgSrc ? (
//         <>
//           <img src={imgSrc} alt="webcam" />
//           <button onClick={retake}>Retake</button>
//         </>
//       ) : (
//         <>
//           <div className="camera-controls mb-2 mt-3">
//             <Form.Select
//               onChange={handleDeviceChange}
//               value={selectedDeviceId}
//               className="camera-select mb-2"
//               aria-label="Select camera device"
//             >
//               {devices.map((device, key) => (
//                 <option value={device.deviceId} key={device.deviceId}>
//                   {device.label || `Camera ${key + 1}`}
//                 </option>
//               ))}
//             </Form.Select>
//           </div>

//           <Webcam
//             className="webcam-capture col-md-6 border border-3 rounded-4"
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             videoConstraints={{
//               ...videoConstraints,
//               deviceId: selectedDeviceId
//                 ? { exact: selectedDeviceId }
//                 : undefined,
//             }}
//           />

//           <Button
//             onClick={capture}
//             className="rounded-pill mt-3 ps-3 pe-3 image-capture-button mb-4"
//             variant="primary"
//           >
//             Capture photo
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };

// export default WebCamera;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/WebCamera.css"; // You may want to rename this CSS file later

const WebCamera = ({ onCapture }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);

      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgSrc(event.target.result);
        onCapture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImgSrc(null);
    setFileName("No file chosen");
  };

  return (
    <div className="container p-0">
      <div className="file-upload-container mb-4 mt-3">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose an image to upload</Form.Label>
          <div className="d-flex flex-column">
            <div className="custom-file-input-container mb-2">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>
            <div className="file-name-display mb-2">{fileName}</div>
          </div>
        </Form.Group>

        {imgSrc && (
          <div className="preview-container mb-3">
            <h5>Preview:</h5>
            <img
              src={imgSrc}
              alt="Preview"
              className="img-preview border border-3 rounded-4"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
            <Button
              onClick={handleReset}
              className="rounded-pill mt-3 ps-3 pe-3 btn-outline-secondary"
              variant="outline-secondary"
            >
              Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebCamera;
