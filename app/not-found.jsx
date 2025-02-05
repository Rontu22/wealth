import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you have a UI library

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            The page you're looking for might have been moved, deleted, or
            doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 pr-12"
            />
            <button className="absolute right-2 top-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              Return Home
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Still lost? Contact our{" "}
          <a
            href="/support"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
