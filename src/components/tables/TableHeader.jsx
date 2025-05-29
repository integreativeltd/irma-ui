import React from 'react';

export default function TableHeader({ headers, checkbox, toggleAll, checked, indeterminate }) {
  return (
    <thead>
      <tr className="bg-gray-50">
        <th scope="col" className="w-12 sm:w-16">
          <div className="flex justify-center px-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              ref={checkbox}
              checked={checked}
              onChange={toggleAll}
              aria-label="Select all"
            />
          </div>
        </th>
        {headers.map((header, index) => (
          <th
            key={index}
            scope="col"
            className="text-left text-sm font-semibold text-gray-900 px-3 py-3"
          >
            {header}
          </th>
        ))}
        <th scope="col" className="w-20">
          <div className="flex justify-center px-3">
            <span className="sr-only">Actions</span>
          </div>
        </th>
      </tr>
    </thead>
  );
}
