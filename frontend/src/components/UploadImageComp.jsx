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

// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "../styles/WebCamera.css"; // You may want to rename this CSS file later

// const UploadImageComp = ({ onCapture }) => {
//   const [imgSrc, setImgSrc] = useState(null);
//   const [fileName, setFileName] = useState("No file chosen");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileName(file.name);

//       // Read the file as a data URL
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImgSrc(event.target.result);
//         onCapture(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleReset = () => {
//     setImgSrc(null);
//     setFileName("No file chosen");
//   };

//   return (
//     <div className="container p-0">
//       <div className="file-upload-container mb-4 mt-3">
//         <Form.Group controlId="formFile" className="mb-3">
//           <Form.Label>Choose an image to upload</Form.Label>
//           <div className="d-flex flex-column">
//             <div className="custom-file-input-container mb-3">
//               {/* Hidden file input */}
//               <Form.Control
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="file-input"
//                 id="fileInput" // Add an ID to the file input
//                 style={{ display: "none" }} // Hide the file input
//               />
//               <Button
//                 variant="primary"
//                 onClick={() => document.getElementById("fileInput").click()} // Trigger file input click
//               >
//                 Upload Image
//               </Button>
//             </div>
//             <div className="file-name-display mb-3">{fileName}</div>
//           </div>
//         </Form.Group>

//         {imgSrc && (
//           <div className="preview-container mb-3">
//             <h5 className="preview-title">Preview:</h5>
//             <img
//               src={imgSrc}
//               alt="Preview"
//               className="img-preview border border-3 rounded-4"
//               style={{ maxWidth: "100%", maxHeight: "300px" }}
//             />
//             <Button
//               onClick={handleReset}
//               className="reset-button mt-3"
//               variant="outline-secondary"
//             >
//               Reset
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadImageComp;

import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiX, FiRefreshCw } from "react-icons/fi";
import "../styles/UploadImage.css";

const UploadImageComp = ({ onCapture }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setIsLoading(true);
    setFileName(file.name);

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      // Add a small delay to show the loading animation
      setTimeout(() => {
        setImgSrc(event.target.result);
        onCapture(event.target.result);
        setIsLoading(false);
      }, 800);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    // Add animation for reset
    setIsLoading(true);
    setTimeout(() => {
      setImgSrc(null);
      setFileName("No file chosen");
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 500);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        processFile(file);
      }
    }
  };

  return (
    <div className="upload-container">
      <AnimatePresence mode="wait">
        {!imgSrc ? (
          <motion.div
            className={`dropzone-container ${isDragging ? "dragging" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Form.Group controlId="formFile" className="mb-3 upload-form-group">
              <motion.div
                className="upload-icon-container"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <FiUpload className="upload-icon" />
              </motion.div>

              <motion.div
                className="upload-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h4>Drag & Drop your image here</h4>
                <p>or</p>
              </motion.div>

              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                id="fileInput"
                ref={fileInputRef}
                style={{ display: "none" }}
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  className="upload-button"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FiUpload className="me-2" />
                  Select Image
                </Button>
              </motion.div>

              <div className="file-name-display mt-3">
                {fileName !== "No file chosen" && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Selected: {fileName}
                  </motion.span>
                )}
              </div>
            </Form.Group>
          </motion.div>
        ) : (
          <motion.div
            className="preview-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="preview-header"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h5 className="preview-title">Preview</h5>
              <motion.button
                className="close-button"
                onClick={handleReset}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </motion.button>
            </motion.div>

            {isLoading ? (
              <motion.div
                className="loading-container"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <FiRefreshCw className="loading-icon" />
              </motion.div>
            ) : (
              <motion.div
                className="image-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.img
                  src={imgSrc}
                  alt="Preview"
                  className="img-preview"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
                <motion.div
                  className="file-info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p>{fileName}</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleReset}
                      className="reset-button"
                      variant="outline-danger"
                    >
                      <FiRefreshCw className="me-2" />
                      Choose Another
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadImageComp;
