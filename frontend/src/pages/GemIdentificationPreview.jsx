// import React, { useEffect, useRef, useState } from "react";
// import { Header } from "../components/Header";
// import { FooterComp } from "../components/FooterComp";

// export const GemIdentificationPreview = ({ onImage = ({}) => {} }) => {
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
//   const [devices, setDevices] = useState([]);
//   const [device, setDevice] = useState(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   // Function to stop all video tracks
//   const stopVideoTracks = () => {
//     if (streamRef.current) {
//       const tracks = streamRef.current.getTracks();
//       tracks.forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//   };

//   useEffect(() => {
//     const startCamera = async () => {
//       // Enumerate devices to get a list of all media devices
//       navigator.mediaDevices
//         .enumerateDevices()
//         .then(function (devices) {
//           // Filter video devices
//           const videoDevices = devices.filter(
//             (device) => device.kind === "videoinput"
//           );
//           const devices_ = [];
//           for (let d of videoDevices) {
//             devices_.push({
//               id: d.deviceId,
//               label: d.label,
//               group: d.groupId,
//             });
//           }
//           console.log(devices_);
//           // @ts-ignore
//           setDevices(devices_);
//         })
//         .catch(function (error) {
//           console.error("Error enumerating devices: ", error);
//         });
//     };

//     startCamera();

//     // Cleanup function to ensure camera is turned off when component unmounts
//     return () => {
//       stopVideoTracks();
//     };
//   }, []);

//   const captureImage = () => {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     if (videoRef.current && context) {
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;

//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       const base64Image = canvas.toDataURL("image/png");
//       setCapturedImage(base64Image);

//       // Stop the camera after capturing
//       stopVideoTracks();
//     }
//   };

//   const handleUpload = () => {
//     if (capturedImage) {
//       onImage({ image: capturedImage });
//     }
//   };

//   useEffect(() => {
//     if (devices != null && devices.length > 0 && !capturedImage) {
//       // Stop any existing stream before starting a new one
//       stopVideoTracks();

//       let id = device == null ? devices[0].id : device;
//       navigator.mediaDevices
//         .getUserMedia({ video: { deviceId: id } })
//         .then(function (stream) {
//           // Store the stream reference
//           streamRef.current = stream;

//           // Use the stream
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//           }
//         })
//         .catch(function (error) {
//           console.error("Error accessing the camera: ", error);
//           alert("Unable to access your camera");
//         });
//     }
//   }, [devices, device, capturedImage]);

//   // Additional effect to handle page visibility changes
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "hidden") {
//         // Stop camera when user switches tabs or minimizes the window
//         stopVideoTracks();
//       } else if (
//         document.visibilityState === "visible" &&
//         !capturedImage &&
//         devices.length > 0
//       ) {
//         // Restart camera when coming back to the page if no image is captured
//         let id = device == null ? devices[0].id : device;
//         navigator.mediaDevices
//           .getUserMedia({ video: { deviceId: id } })
//           .then(function (stream) {
//             streamRef.current = stream;
//             if (videoRef.current) {
//               videoRef.current.srcObject = stream;
//             }
//           })
//           .catch(function (error) {
//             console.error("Error accessing the camera: ", error);
//           });
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, [devices, device, capturedImage]);

//   return (
//     <div>
//       <Header />
//       <div
//         className="w-100 p-2 m-0"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <div className="my-2 fs-3 fw-bold">Camera Live preview</div>

//         {!capturedImage ? (
//           <>
//             <select
//               onChange={(e) => setDevice(e.target.value)}
//               className="form-select w-50 text-center my-3"
//             >
//               {devices.map((device, index) => (
//                 <option key={index} value={device.id}>
//                   {device.label}
//                 </option>
//               ))}
//             </select>

//             <video
//               ref={videoRef}
//               className="col-md-6 border border-3 rounded-4"
//               style={{ height: "400px" }}
//               autoPlay
//             />

//             <button
//               onClick={captureImage}
//               style={{
//                 width: "fit-content",
//                 backgroundColor: "Blue",
//                 fontSize: "19px",
//                 fontWeight: "bolder",
//                 border: 0,
//               }}
//               className="btn btn-info rounded rounded-5 my-5 py-2 px-5 text-white"
//             >
//               Capture the Image
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="col-md-6 border border-3 rounded-4 d-flex justify-content-center">
//               <img
//                 src={capturedImage}
//                 alt="Captured"
//                 style={{ height: "400px", width: "auto" }}
//               />
//             </div>

//             <div className="d-flex mt-4">
//               <button
//                 onClick={() => {
//                   setCapturedImage(null);
//                   // Restart camera will happen automatically via the effect
//                 }}
//                 style={{
//                   width: "fit-content",
//                   backgroundColor: "Red",
//                   fontSize: "19px",
//                   fontWeight: "bolder",
//                   border: 0,
//                   marginRight: "15px",
//                 }}
//                 className="btn rounded rounded-5 py-2 px-5 text-white"
//               >
//                 Retake
//               </button>

//               <button
//                 onClick={handleUpload}
//                 style={{
//                   width: "fit-content",
//                   backgroundColor: "Blue",
//                   fontSize: "19px",
//                   fontWeight: "bolder",
//                   border: 0,
//                 }}
//                 className="btn btn-info rounded rounded-5 py-2 px-5 text-white"
//               >
//                 Upload the Image
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//       <FooterComp />
//     </div>
//   );
// };

// export default GemIdentificationPreview;

import React, { useState, useRef } from "react";
import { Header } from "../components/Header";
import { FooterComp } from "../components/FooterComp";
import Cropper from "react-easy-crop";

const GemIdentificationPreview = ({ onImage = ({}) => {} }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setCapturedImage(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target.result);
        setIsCropping(true); // Start cropping mode when image is loaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop complete
  const onCropComplete = (croppedArea, croppedAreaPixelsData) => {
    setCroppedAreaPixels(croppedAreaPixelsData);
  };

  // Create the cropped image
  const createCroppedImage = async () => {
    if (!croppedAreaPixels || !previewSrc) return null;

    const image = new Image();
    image.src = previewSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size to the cropped area
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        // Draw the cropped image
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  // Apply the crop
  const handleApplyCrop = async () => {
    const croppedImageUrl = await createCroppedImage();
    if (croppedImageUrl) {
      setCapturedImage(croppedImageUrl);
      setIsCropping(false);
    }
  };

  // Cancel cropping
  const handleCancelCrop = () => {
    setIsCropping(false);
    if (!capturedImage) {
      // If no cropped image exists, reset everything
      setPreviewSrc(null);
      setSelectedImage(null);
    }
  };

  // Reset and upload a new image
  const handleReset = () => {
    setSelectedImage(null);
    setPreviewSrc(null);
    setCapturedImage(null);
    setIsCropping(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Handle upload to pass image to parent component
  const handleUpload = () => {
    if (capturedImage) {
      onImage({ image: capturedImage });
    }
  };

  return (
    <>
      <Header />
      <div>
        <div
          className="w-100 p-2 m-0"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="my-2 fs-3 fw-bold">Upload Gem Image</div>

          {!capturedImage ? (
            <>
              <div className="col-md-6 mb-3 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />

                <button
                  onClick={handleBrowseClick}
                  style={{
                    width: "fit-content",
                    backgroundColor: "Blue",
                    fontSize: "19px",
                    fontWeight: "bolder",
                    border: 0,
                  }}
                  className="btn btn-info rounded rounded-5 my-3 py-2 px-5 text-white"
                >
                  Browse Images
                </button>

                <div className="mt-2">
                  {selectedImage ? selectedImage.name : "No file selected"}
                </div>
              </div>

              {isCropping && previewSrc ? (
                <div className="col-md-6 border border-3 rounded-4">
                  <div
                    style={{
                      position: "relative",
                      height: "400px",
                      width: "100%",
                    }}
                  >
                    <Cropper
                      image={previewSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>

                  <div className="my-3">
                    <div className="mb-3">
                      <label>Zoom: {zoom.toFixed(1)}x</label>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="form-range w-50"
                      />
                    </div>

                    <div className="d-flex justify-content-center gap-3">
                      <button
                        onClick={handleCancelCrop}
                        style={{
                          width: "fit-content",
                          backgroundColor: "Red",
                          fontSize: "19px",
                          fontWeight: "bolder",
                          border: 0,
                        }}
                        className="btn rounded rounded-5 py-2 px-5 text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleApplyCrop}
                        style={{
                          width: "fit-content",
                          backgroundColor: "Blue",
                          fontSize: "19px",
                          fontWeight: "bolder",
                          border: 0,
                        }}
                        className="btn btn-info rounded rounded-5 py-2 px-5 text-white"
                      >
                        Apply Crop
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                previewSrc && (
                  <div className="col-md-6 border border-3 rounded-4 d-flex justify-content-center">
                    <img
                      src={previewSrc}
                      alt="Preview"
                      style={{ height: "400px", width: "auto" }}
                    />
                  </div>
                )
              )}

              {previewSrc && !isCropping && (
                <div className="d-flex mt-4">
                  <button
                    onClick={() => setIsCropping(true)}
                    style={{
                      width: "fit-content",
                      backgroundColor: "Blue",
                      fontSize: "19px",
                      fontWeight: "bolder",
                      border: 0,
                    }}
                    className="btn btn-info rounded rounded-5 my-5 py-2 px-5 text-white"
                  >
                    Crop Image
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="col-md-6 border border-3 rounded-4 d-flex justify-content-center">
                <img
                  src={capturedImage}
                  alt="Captured"
                  style={{ height: "400px", width: "auto" }}
                />
              </div>

              <div className="d-flex mt-4">
                <button
                  onClick={handleReset}
                  style={{
                    width: "fit-content",
                    backgroundColor: "Red",
                    fontSize: "19px",
                    fontWeight: "bolder",
                    border: 0,
                    marginRight: "15px",
                  }}
                  className="btn rounded rounded-5 py-2 px-5 text-white"
                >
                  Upload New
                </button>

                <button
                  onClick={handleUpload}
                  style={{
                    width: "fit-content",
                    backgroundColor: "Blue",
                    fontSize: "19px",
                    fontWeight: "bolder",
                    border: 0,
                  }}
                  className="btn btn-info rounded rounded-5 py-2 px-5 text-white"
                >
                  Upload the Image
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <FooterComp />
    </>
  );
};

export default GemIdentificationPreview;
