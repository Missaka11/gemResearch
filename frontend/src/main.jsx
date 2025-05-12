import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route ,useNavigate} from "react-router-dom";
import App from "./App.jsx";
import GemAuthenticate from "./pages/GemAuthenticate.jsx";
import ImageCaptureRS from "./pages/ImageCaptureRS.jsx";
import GemShapeCapture from "./pages/GemShapeCapture.jsx";
import LiveReviewGemShape from "./pages/LiveReviewGemShape.jsx";
import GemShapePreview from "./pages/GemShapePreview.jsx";
import GemShapeResult from "./pages/GemShapeResult.jsx";
import InstructionsPage from "./pages/Instructions.jsx"
import GemIdentification from "./pages/GemIdentification.jsx";
import GemIdentificationUpload from "./pages/GemIdentificationUpload.jsx";
import GemIdentificationResults from "./pages/GemIdentificationResults.jsx";
import ThreeDModelView from "./pages/GemShape3DModel.jsx";


import { useState } from "react";

function AppWrapper() {
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const onImage = ({image=""}) => {
    setImage(image);
    navigate("/GemIdentificationResults");
  };
  

  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<App />} />
      <Route path="/GemIdentification" element={<GemIdentification />} />
      <Route
        path="/GemIdentificationUpload"
        element={<GemIdentificationUpload onImage={onImage} />}
      />
      <Route
        path="/GemIdentificationResults"
        element={<GemIdentificationResults />}
      />

      <Route
        path="/GemIdentificationResults"
        element={<GemIdentificationResults />}
      />
        <Route path="/GemAuthenticate" element={<GemAuthenticate />} />
        <Route
          path="/GemAuthenticate/ImageCaptureRS"
          element={<ImageCaptureRS />}
        />
      <Route path="/InstructionsPage" element={<InstructionsPage />} />
      <Route path="/GemShapeCapture" element={<GemShapeCapture />} />
      <Route
        path="/GemShapeCapture/LiveReviewGemShape"
        element={<LiveReviewGemShape />}
      />
      <Route path="/GemShapePreview" element={<GemShapePreview />} />
      <Route path="/GemShapeResult" element={<GemShapeResult />} />
      <Route path="/ThreeDModelView" element={<ThreeDModelView />} />
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>
);