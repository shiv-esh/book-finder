// useDebounce.js
// -----------------------------------------
// Custom React hook to debounce a changing value.
// Helps limit the frequency of expensive operations (like API calls) 
// while a user is typing or updating input rapidly.

import { useState, useEffect } from 'react'

/**
 * useDebounce Hook
 *
 * @param {any} value - The input value to debounce.
 * @param {number} delay - The debounce delay time in milliseconds (default: 300ms).
 * @returns {any} debounced - The debounced version of the input value.
 *
 * Usage:
 *   const debouncedQuery = useDebounce(query, 400);
 *   // debouncedQuery updates only after user stops typing for 400ms.
 */
export default function useDebounce(value, delay = 300) {
  // State to store the debounced value
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const id = setTimeout(() => setDebounced(value), delay)

    // Clear timer if value or delay changes before timeout completes
    return () => clearTimeout(id)
  }, [value, delay])

  // Return the latest debounced value
  return debounced
}
