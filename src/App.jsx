
import { useState } from "react";

import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Toaster } from "sonner";

import Navbar from "./components/layout/Navbar";

import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import CustomizePage from "./pages/CustomizePage";
import GenerationPage from "./pages/GenerationPage";
import ResultsPage from "./pages/ResultsPage";

import useImageUpload from "./hooks/useImageUpload";
import useCustomization from "./hooks/useCustomization";
import useHeadshotGenerator from "./hooks/useHeadshotGenerator";

export default function App() {
  const upload = useImageUpload();
  const customization = useCustomization();
  const generator = useHeadshotGenerator();

  const [generationRequest, setGenerationRequest] =
    useState(null);

  const hasImage = Boolean(
    upload.file && upload.previewUrl
  );

  const hasValidRequest = Boolean(
    hasImage &&
    generationRequest &&
    generationRequest.image === upload.file
  );

  const hasResult = Boolean(
    hasValidRequest &&
    generator.status === "success" &&
    generator.result
  );

  // Invalidate an old result before accepting a new request.
  const handleGenerationRequest = (request) => {
    generator.resetGeneration();
    setGenerationRequest(request);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />

      <main className="mx-auto max-w-7xl px-6">
        <Routes>

          {/* Landing page */}
          <Route
            path="/"
            element={<LandingPage />}
          />

          {/* Upload page */}
          <Route
            path="/upload"
            element={<UploadPage upload={upload} />}
          />

          {/* Customization page */}
          <Route
            path="/customize"
            element={
              hasImage ? (
                <CustomizePage
                  upload={upload}
                  customization={customization}
                  setGenerationRequest={
                    handleGenerationRequest
                  }
                />
              ) : (
                <Navigate to="/upload" replace />
              )
            }
          />

          {/* Generation page */}
          <Route
            path="/generation"
            element={
              hasValidRequest ? (
                <GenerationPage
                  generationRequest={generationRequest}
                  generator={generator}
                />
              ) : (
                <Navigate
                  to={hasImage ? "/customize" : "/upload"}
                  replace
                />
              )
            }
          />

          {/* Results page */}
          <Route
            path="/results"
            element={
              hasResult ? (
                <ResultsPage
                  upload={upload}
                  customization={customization}
                  generator={generator}
                  generationRequest={generationRequest}
                  setGenerationRequest={setGenerationRequest}
                />
              ) : (
                <Navigate
                  to={hasImage ? "/customize" : "/upload"}
                  replace
                />
              )
            }
          />

          {/* Fallback route */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </main>
    </div>
  );
}
