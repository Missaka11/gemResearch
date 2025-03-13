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
import InstructionsPage from "./pages/Instructions.jsx"
import GemIdentification from "./pages/GemIdentification.jsx";
import GemIdentificationPreview from "./pages/GemIdentificationPreview.jsx";
import ThreeDModelView from "./pages/GemShape3DModel.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/GemIdentification" element={<GemIdentification />} />
        <Route
          path="/GemIdentificationPreview"
          element={<GemIdentificationPreview />}
        />
        <Route path="/ImageCaptureRS" element={<ImageCaptureRS />} />
        <Route path="/InstructionsPage" element={<InstructionsPage />}/>
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
