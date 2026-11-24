
import { useState } from "react";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import CustomizePage from "./pages/CustomizePage";
import GenerationPage from "./pages/GenerationPage";

import useImageUpload from "./hooks/useImageUpload";
import useCustomization from "./hooks/useCustomization";
import useHeadshotGenerator from "./hooks/useHeadshotGenerator";

export default function App() {
  const upload = useImageUpload();
  const customization = useCustomization();
  const generator = useHeadshotGenerator();

  const [generationRequest, setGenerationRequest] =
    useState(null);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6">
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/upload"
            element={<UploadPage upload={upload} />}
          />

          <Route
            path="/customize"
            element={
              upload.file && upload.previewUrl ? (
                <CustomizePage
                  upload={upload}
                  customization={customization}
                  setGenerationRequest={setGenerationRequest}
                />
              ) : (
                <Navigate to="/upload" replace />
              )
            }
          />

          <Route
            path="/generation"
            element={
              upload.file &&
              generationRequest &&
              generationRequest.image === upload.file ? (
                <GenerationPage
                  generationRequest={generationRequest}
                  generator={generator}
                />
              ) : (
                <Navigate
                  to={upload.file ? "/customize" : "/upload"}
                  replace
                />
              )
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}
