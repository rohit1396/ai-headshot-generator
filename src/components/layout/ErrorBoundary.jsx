
import { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // In production, send this to an error-monitoring service.
    console.error("Application error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          className="flex min-h-[70vh] flex-col
            items-center justify-center px-6 text-center"
        >
          <div className="rounded-full bg-red-50 p-4">
            <AlertTriangle
              size={32}
              className="text-red-600"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Something went wrong
          </h1>

          <p className="mt-3 max-w-md text-sm text-gray-500">
            An unexpected error occurred. Please try
            again or return to the home page.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="flex items-center gap-2 rounded-xl
                bg-violet-600 px-5 py-3 text-sm
                font-medium text-white hover:bg-violet-700"
            >
              <RefreshCw size={16} />
              Try again
            </button>

            <a
              href="/"
              className="rounded-xl border border-gray-200
                px-5 py-3 text-sm font-medium
                hover:bg-gray-50"
            >
              Go home
            </a>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
