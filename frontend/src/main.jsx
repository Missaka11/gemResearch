import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import GemAuthenticate from "./pages/GemAuthenticate.jsx";
import ImageCaptureRS from "./pages/ImageCaptureRS.jsx";
import GemShapeCapture from "./pages/GemShapeCapture.jsx";
import LiveReviewGemShape from "./pages/LiveReviewGemShape.jsx";
import GemShapePreview from "./pages/GemShapePreview.jsx";
import GemShapeResult from "./pages/GemShapeResult.jsx";

import GemIdentification from "./pages/GemIdentification.jsx";

import ThreeDModelView from "./pages/GemShape3DModel.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/GemIdentification" element={<GemIdentification />} />
        <Route path="/GemAuthenticate" element={<GemAuthenticate />} />
        <Route
          path="/GemAuthenticate/ImageCaptureRS"
          element={<ImageCaptureRS />}
        />

        <Route path="/GemShapeCapture" element={<GemShapeCapture />} />
        <Route
          path="/GemShapeCapture/LiveReviewGemShape"
          element={<LiveReviewGemShape />}
        />
        <Route path="/GemShapePreview" element={<GemShapePreview />} />
        <Route path="/GemShapeResult" element={<GemShapeResult />} />

        <Route path="/ThreeDModelView" element={<ThreeDModelView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
