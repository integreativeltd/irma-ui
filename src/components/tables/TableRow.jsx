import React from 'react';

export default function TableRow({ row, selected, selectedRows, setSelectedRows }) {
  const toggle = (e) => {
    setSelectedRows(
      e.target.checked
        ? [...selectedRows, row]
        : selectedRows.filter((r) => r !== row)
    );
  };

  return (
    <tr className={selected ? 'bg-gray-50' : undefined}>
      <td className="relative px-7 sm:w-12 sm:px-6">
        {selected && <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />}
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          checked={selected}
          onChange={toggle}
        />
      </td>
      {Object.values(row).map((value, idx) => (
        <td key={idx} className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
          {value}
        </td>
      ))}
      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium text-right">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </td>
    </tr>
  );
}
