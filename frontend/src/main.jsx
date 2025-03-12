import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import ImageCaptureRS from "./pages/ImageCaptureRS.jsx";
import GemShapeCapture from "./pages/GemShapeCapture.jsx";
import LiveReviewGemShape from "./pages/LiveReviewGemShape.jsx";
import GemShapePreview from "./pages/GemShapePreview.jsx";
import GemShapeResult from "./pages/GemShapeResult.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/ImageCaptureRS" element={<ImageCaptureRS />} />
        <Route path="/GemShapeCapture" element={<GemShapeCapture />} />
        <Route
          path="/GemShapeCapture/LiveReviewGemShape"
          element={<LiveReviewGemShape />}
        />
        <Route path="/GemShapePreview" element={<GemShapePreview />} />
        <Route path="/GemShapeResult" element={<GemShapeResult />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
