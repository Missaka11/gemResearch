import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ImageCaptureRS from "./pages/ImageCaptureRS.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/" element={<App />}/>
        <Route path="/ImageCaptureRS" element={<ImageCaptureRS />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
