// BookCard.jsx
// -----------------------------------------
// Displays information about a single book result in the search grid.
// Includes book cover image, title, author(s), and first publication year.

export default function BookCard({ book }) {
  // Construct cover image URL if available, otherwise null
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  // Use fallback values for missing data
  const title = book.title || 'Untitled';
  const author =
    (book.author_name && book.author_name.join(', ')) || 'Unknown author';
  const year = book.first_publish_year || '—';

  return (
    <article
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300
                 overflow-hidden flex flex-col"
    >
      {/* Cover image section */}
      <div className="w-full h-full object-cover">
        {cover ? (
          // Render cover image if available
          <img
            src={cover}
            alt={`Cover of ${title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          // Fallback UI when cover image is missing
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Book info section */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Book title (truncated to two lines) */}
        <h3 className="font-semibold text-gray-900 text-base line-clamp-2">
          {title}
        </h3>

        {/* Author(s) name (truncated to one line) */}
        <p className="text-sm text-gray-600 mt-1 line-clamp-1">{author}</p>

        {/* Publication year displayed at bottom of card */}
        <p className="text-xs text-gray-500 mt-auto pt-2">
          First published: {year}
        </p>
      </div>
    </article>
  );
}
