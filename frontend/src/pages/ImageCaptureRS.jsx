// import React, { useState } from "react";
// import WebCamera from "../components/WebCamera";
// import ImageCrop from "../components/ImageCrop";
// import "../styles/CameraAndCropApp.css";

// const ImageCaptureRS = () => {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [isCropping, setIsCropping] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   const handleCapture = (imageSrc) => {
//     setCapturedImage(imageSrc);
//     setIsCropping(true);
//   };

//   const handleRetake = () => {
//     setCapturedImage(null);
//     setIsCropping(false);
//   };

//   const handleCropComplete = (croppedArea, croppedAreaPixels) => {
//     console.log("Cropped Area:", croppedArea);
//     console.log("Cropped Area Pixels:", croppedAreaPixels);
//     // You can handle the cropped image here, e.g., upload or save it.
//   };

//   const handleUpload = () => {
//     setIsUploading(true);
//     // Simulate an upload process
//     setTimeout(() => {
//       setIsUploading(false);
//       alert("Image uploaded successfully!");
//     }, 2000);
//   };

//   return (
//     <div className="cameraAndCropApp">
//       <h1>Camera and Crop Application</h1>
//       {!capturedImage ? (
//         <WebCamera onCapture={handleCapture} />
//       ) : (
//         <div className="cropAndUploadSection">
//           <ImageCrop
//             imageSrc={capturedImage}
//             onCropComplete={handleCropComplete}
//           />
//           <div className="buttons">
//             <button onClick={handleRetake}>Retake</button>
//             <button onClick={handleUpload} disabled={isUploading}>
//               {isUploading ? "Uploading..." : "Upload"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageCaptureRS;


import React, { useState } from "react";
import WebCamera from "../components/WebCamera";
import ImageCrop from "../components/ImageCrop";
import "../styles/CameraAndCropApp.css";

const ImageCaptureRS = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
    setIsCropping(true);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCropping(false);
    setPredictionResult(null);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log("Cropped Area:", croppedArea);
    console.log("Cropped Area Pixels:", croppedAreaPixels);
    // You can handle the cropped image here, e.g., upload or save it.
  };

  const handleUpload = async () => {
    setIsUploading(true);

    try {
      // Convert the cropped image to a Blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      // Create a FormData object and append the image
      const formData = new FormData();
      formData.append("image", blob, "cropped-image.jpg");

      // Send the image to the Flask API
      const apiResponse = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await apiResponse.json();
      setPredictionResult(result);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="cameraAndCropApp">
      <h1>Camera and Crop Application</h1>
      {!capturedImage ? (
        <WebCamera onCapture={handleCapture} />
      ) : (
        <div className="cropAndUploadSection">
          <ImageCrop
            imageSrc={capturedImage}
            onCropComplete={handleCropComplete}
          />
          <div className="buttons">
            <button onClick={handleRetake}>Retake</button>
            <button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {predictionResult && (
            <div className="predictionResult">
              <h2>Prediction Result</h2>
              <p>Predicted Class: {predictionResult.predicted_class}</p>
              <p>Confidence: {predictionResult.confidence}</p>
              <p>All Probabilities:</p>
              <ul>
                {Object.entries(predictionResult.all_probabilities).map(
                  ([category, probability]) => (
                    <li key={category}>
                      {category}: {probability}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCaptureRS;
