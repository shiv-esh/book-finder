// App.jsx
// -----------------------------------------
// Root component of the Book Finder application.
// Sets up the main layout (header, content, footer) and loads the Home page.
// Provides consistent page styling and structure using Tailwind CSS.

import React from 'react';
import Home from './pages/Home';

/**
 * App Component
 * - Defines the overall structure of the Book Finder app.
 * - Includes a header, main content (Home), and footer.
 * - Uses responsive Tailwind classes for spacing and alignment.
 */
export default function App() {
  return (
    // Page wrapper ensures full height and base styling
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      
      {/* Central container for all page sections */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="py-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-blue-700 tracking-tight">
            Book Finder
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Search books from Open Library
          </p>
        </header>

        {/* Main Content Section */}
        <main className="flex-1 py-6">
          {/* Renders the Home page with search and results */}
          <Home />
        </main>

        {/* Footer Section */}
        <footer className="py-6 border-t text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Book Finder — Powered by Open Library API
        </footer>
      </div>
    </div>
  );
}
