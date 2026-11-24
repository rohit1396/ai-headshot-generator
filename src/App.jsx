import { Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import useImageUpload from "./hooks/useImageUpload";

export default function App() {
  const upload = useImageUpload();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage upload={upload} />} />
        </Routes>
      </main>
    </div>
  );
}
