
import { lazy, Suspense, useState } from "react";

import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Toaster } from "sonner";

import Navbar from "./components/layout/Navbar";

const LandingPage = lazy(
  () => import("./pages/LandingPage")
);

const UploadPage = lazy(
  () => import("./pages/UploadPage")
);

const CustomizePage = lazy(
  () => import("./pages/CustomizePage")
);

const GenerationPage = lazy(
  () => import("./pages/GenerationPage")
);

const ResultsPage = lazy(
  () => import("./pages/ResultsPage")
);

import useImageUpload from "./hooks/useImageUpload";
import useCustomization from "./hooks/useCustomization";
import useHeadshotGenerator from "./hooks/useHeadshotGenerator";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import PageLoader from "./components/layout/PageLoader";

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
    <ErrorBoundary>
      <div className="min-h-screen bg-[#fafafa]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4
            focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white
            focus:p-3 focus:text-violet-700 focus:shadow-lg"
        >
          Skip to main content
        </a>

        <Navbar />

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />

        <main id="main-content" className="mx-auto max-w-7xl px-6">
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
