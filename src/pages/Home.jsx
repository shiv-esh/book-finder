// Home.jsx
// ---------------------------
// Main page component for the Book Finder app.
// Handles search functionality, API calls, pagination, and result rendering.

import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ResultsGrid from "../components/ResultsGrid";
import { searchBooks } from "../api/openLibrary";
import useDebounce from "../hooks/useDebounce";

/**
 * Home Component
 * - Manages the book search input, type (title/author), and API results.
 * - Debounces user input to limit API calls.
 * - Supports pagination ("Load more" functionality).
 */
export default function Home() {
  // State to store the current search query
  const [query, setQuery] = useState("");

  // State to determine search type (by title or author)
  const [searchType, setSearchType] = useState("title");

  // Debounced query to reduce API requests while typing
  const debouncedQuery = useDebounce(query, 400);

  // Store search results and metadata
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);

  /**
   * Fetch books whenever the debounced query or search type changes.
   * - Cancels any ongoing request if the component re-renders.
   * - Resets pagination and results on new searches.
   */
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setNumFound(0);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch books from the Open Library API
        const data = await searchBooks(debouncedQuery, searchType, 1);
        if (cancelled) return;

        // Update state with results and reset pagination
        setResults(data.docs || []);
        setNumFound(data.numFound || 0);
        setPage(1);
      } catch (e) {
        setError(e.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => (cancelled = true);
  }, [debouncedQuery, searchType]);

  /**
   * Load the next page of results and append to current list.
   */
  const loadMore = async () => {
    const next = page + 1;
    setLoading(true);
    try {
      const data = await searchBooks(debouncedQuery, searchType, next);
      setResults((prev) => [...prev, ...(data.docs || [])]);
      setPage(next);
    } catch (e) {
      setError(e.message || "Failed to load more");
    } finally {
      setLoading(false);
    }
  };

  // Render search bar, results grid, and "Load more" button
  return (
    <section className="w-full max-w-3xl mx-auto px-4">
      {/* Search bar with query input and search type toggle */}
      <SearchBar
        value={query}
        onChange={setQuery}
        searchType={searchType}
        onTypeChange={setSearchType}
      />

      {/* Display error message if fetching fails */}
      {error && (
        <div className="mt-4 text-center text-red-600 text-sm">{error}</div>
      )}

      {/* Grid of search results */}
      <ResultsGrid results={results} loading={loading} />

      {/* Load more button if there are more results to fetch */}
      {numFound > results.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
}
