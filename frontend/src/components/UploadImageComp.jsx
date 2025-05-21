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
