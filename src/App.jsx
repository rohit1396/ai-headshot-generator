
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Navbar from "./components/layout/Navbar";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6">
        <section className="flex min-h-[75vh] flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
            <Sparkles size={16} />
            Professional AI Headshots
          </div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-gray-950 sm:text-6xl">
            Your next professional
            <span className="text-violet-600"> headSHOT </span>
            starts here.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Turn your everyday selfie into a polished professional
            headshot for LinkedIn, resumes, and business profiles.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="mt-8 flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          >
            Create Your Headshot
            <ArrowRight size={18} />
          </button>

          {started && (
            <div
              role="status"
              className="mt-8 rounded-xl border border-violet-200 bg-violet-50 px-6 py-4 text-violet-800"
            >
              Upload your selfie — coming in Step 2!
            </div>
          )}

          <p className="mt-5 text-sm text-gray-400">
            Frontend demo · No signup required
          </p>
        </section>
      </main>
    </div>
  );
}
