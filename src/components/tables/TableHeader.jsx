import React from 'react';

export default function TableHeader({ headers, checkboxRef, toggleAll, checked }) {
  return (
    <thead>
      <tr>
        <th className="relative px-7 sm:w-12 sm:px-6">
          <div className="absolute left-4 top-1/2 -mt-2">
            <input
              ref={checkboxRef}
              type="checkbox"
              checked={checked}
              onChange={toggleAll}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </th>
        {headers.map((header) => (
          <th
            key={header}
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            {header}
          </th>
        ))}
        <th className="py-3.5 pl-3 pr-4 sm:pr-3 text-right">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
}
