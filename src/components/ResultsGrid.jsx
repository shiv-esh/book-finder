// ResultsGrid.jsx
// -----------------------------------------
// Displays a grid of book results based on the user's search query.
// Handles loading, empty states, and rendering of individual BookCard components.

import React from 'react'
import BookCard from './BookCard'

/**
 * ResultsGrid Component
 * 
 * Props:
 * - results (Array): List of book objects fetched from the API.
 * - loading (boolean): Indicates if data is currently being fetched.
 * 
 * Responsibilities:
 * - Shows loading or empty states depending on API status.
 * - Renders a responsive grid of BookCard components.
 */
export default function ResultsGrid({ results = [], loading = false }) {
  
  // Display message when loading initial results
  if (loading && results.length === 0)
    return (
      <div className="mt-12 text-center text-gray-500 text-sm">
        Loading results...
      </div>
    )

  // Display message when no results are found
  if (!loading && results.length === 0)
    return (
      <div className="mt-12 text-center text-gray-400 text-sm">
        No results found — try another query.
      </div>
    )

  // Render grid of book cards once results are available
  return (
    <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((book, i) => (
        <BookCard key={book.key || i} book={book} />
      ))}
    </div>
  )
}
