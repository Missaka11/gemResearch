import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { FooterComp } from "../components/FooterComp";

const GemIdentificationUpload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Function to convert image to base64
  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        setUploadError("Please select an image file");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setUploadError(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange({ target: { files: [e.dataTransfer.files[0]] } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://127.0.0.1:5001/segment', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
      
      // Convert the uploaded image to base64
      const base64Image = await convertImageToBase64(image);
      
      navigate("/GemIdentificationResults", {
        state: { 
          image: base64Image,
          analysisResult: result
        }
      });
    } catch (error) {
      setUploadError('Failed to upload image. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="gem-upload-container">
        <div className="upload-content">
          <div className="upload-header">
            <h1 className="upload-title">Upload Your Gem Image</h1>
            <p className="upload-subtitle">Select a high-quality image of your gemstone</p>
          </div>
          
          <form onSubmit={handleSubmit} className="upload-form">
            <div 
              className={`upload-area ${dragActive ? 'drag-active' : ''} ${preview ? 'has-preview' : ''}`} 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                id="image-upload"
                disabled={uploading}
              />
              
              <label htmlFor="image-upload" className="upload-label">
                <div className="upload-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                </div>
                <div className="upload-text">
                  <h3>Drag & Drop or Click to Upload</h3>
                  <p>Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                </div>
              </label>

              {preview && (
                <div className="preview-container">
                  <img
                    src={preview}
                    alt="Preview"
                    className="image-preview"
                  />
                  <div className="preview-overlay">
                    <i className="fas fa-check-circle"></i>
                    <span>Image Ready</span>
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {uploadError}
                </div>
              )}

              {uploading && (
                <div className="upload-progress">
                  <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                  <span>{uploadProgress}%</span>
                </div>
              )}
            </div>

            <div className="upload-buttons">
              <button 
                type="submit" 
                className="upload-btn" 
                disabled={!image || uploading}
              >
                <i className="fas fa-arrow-right"></i>
                {uploading ? 'Uploading...' : 'Continue to Analysis'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterComp />
    </>
  );
};

export default GemIdentificationUpload;
