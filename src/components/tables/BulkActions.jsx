import React from 'react';

export default function BulkActions() {
  return (
    <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
      <button
        type="button"
        className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Bulk Edit
      </button>
      <button
        type="button"
        className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-50"
      >
        Delete All
      </button>
    </div>
  );
}
