import React, { useRef, useState, useLayoutEffect } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import BulkActions from './BulkActions';

export default function TableWrapper({
  title,
  subtitle,
  headers,
  rows,
  search,
  setSearch,
  searchPlaceholder = 'Search...',
}) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedRows.length > 0 && selectedRows.length < rows.length;
    setChecked(selectedRows.length === rows.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedRows, rows.length]);

  const toggleAll = () => {
    setSelectedRows(checked || indeterminate ? [] : rows);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-500">{title}</h1>
        <p className="mt-2 text-md text-gray-500">{subtitle}</p>

        {setSearch && (
          <div className="mt-4 flex justify-center">
            <input
              className="border p-2 w-full max-w-md rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#12496b]"
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedRows.length > 0 && <BulkActions />}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <TableHeader
                  headers={headers}
                  checkbox={checkbox}
                  toggleAll={toggleAll}
                  checked={checked}
                />
                <tbody className="divide-y divide-gray-200 bg-white">
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      row={row}
                      selected={selectedRows.includes(row)}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
