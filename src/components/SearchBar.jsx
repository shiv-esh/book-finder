// SearchBar.jsx
// -----------------------------------------
// Search bar component for the Book Finder app.
// Allows users to search for books by title or author.
// Includes a dropdown to switch search type, input field, and search button.

import React from "react";

/**
 * SearchBar Component
 * 
 * Props:
 * - value (string): Current search input value.
 * - onChange (function): Handler for updating the search input.
 * - searchType (string): Selected type of search ("title" or "author").
 * - onTypeChange (function): Handler to switch between search types.
 * 
 * Responsibilities:
 * - Renders a form with a search input, dropdown for search type, and button.
 * - Calls `onChange` and `onTypeChange` to update state in the parent (Home.jsx).
 * - Prevents default form submission to handle search dynamically.
 */
export default function SearchBar({ value, onChange, searchType, onTypeChange }) {
  return (
    // Search form wrapper (responsive: stacks on small screens)
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full flex flex-col sm:flex-row items-stretch gap-3 mt-6"
    >
      {/* Dropdown to select search type (Title or Author) */}
      <select
        value={searchType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>

      {/* Search input field */}
      <input
        id="search"
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-800
                   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-transparent transition"
        placeholder={
          searchType === "author"
            ? "Search books by author — e.g. 'Agatha Christie'"
            : "Search books by title — e.g. 'Pride and Prejudice'"
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Search button (visual only, actual search triggers via input typing) */}
      <button
        type="button"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                   hover:bg-blue-700 active:bg-blue-800 focus:outline-none
                   focus:ring-2 focus:ring-blue-400 transition"
      >
        Search
      </button>
    </form>
  );
}
