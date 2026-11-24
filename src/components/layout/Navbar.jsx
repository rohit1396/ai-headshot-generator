
import { Camera, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-violet-600 p-2 text-white">
            <Camera size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Headshot<span className="text-violet-600">AI</span>
          </span>
        </Link>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <GitBranch size={18} />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </nav>
    </header>
  );
}
