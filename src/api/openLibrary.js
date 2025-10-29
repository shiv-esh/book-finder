// openLibrary.js
// -----------------------------------------
// API utility for interacting with the Open Library search endpoint.
// Provides a function to search books by title or author with pagination support.

/**
 * searchBooks
 *
 * Fetches books from the Open Library API based on a search query.
 *
 * @param {string} query - The search keyword (e.g., book title or author name).
 * @param {string} [type="title"] - The type of search ("title" or "author").
 * @param {number} [page=1] - The page number for pagination.
 * @returns {Promise<Object>} - Returns a JSON object containing:
 *   - docs: Array of book results.
 *   - numFound: Total number of results found.
 *
 * Usage:
 *   const data = await searchBooks("Harry Potter", "title", 1);
 */
 export async function searchBooks(query, type = "title", page = 1) {
  // Return empty result if query is missing
  if (!query) return { docs: [], numFound: 0 };

  // Determine the correct query parameter based on search type
  const param = type === "author" ? "author" : "title";

  // Encode user input to make it safe for URL usage
  const q = encodeURIComponent(query);

  // Construct Open Library API URL
  const url = `https://openlibrary.org/search.json?${param}=${q}&page=${page}`;

  // Fetch data from API
  const res = await fetch(url);

  // Throw an error if network response is invalid
  if (!res.ok) throw new Error("Network response was not ok");

  // Return parsed JSON response
  return res.json();
}
