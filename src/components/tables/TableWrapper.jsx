import React, { useRef, useState, useLayoutEffect } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import BulkActions from './BulkActions';
import { PaginationControl } from '../ui/pagination-control';

export default function TableWrapper({
  title,
  subtitle,
  headers,
  rows,
  search,
  setSearch,
  searchPlaceholder = 'Search...',
  onRowClick,
  onBulkAction,
  type = 'default',
  menuItems = {},
  drawerContent = null,
  drawerTitle = ''
}) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = rows.slice(startIndex, endIndex);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedRows.length > 0 && selectedRows.length < currentRows.length;
    setChecked(selectedRows.length === currentRows.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedRows, currentRows.length]);

  const toggleAll = () => {
    setSelectedRows(checked || indeterminate ? [] : currentRows);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  const handleBulkAction = (action) => {
    if (onBulkAction) {
      onBulkAction(action, selectedRows);
    }
    // Clear selections after bulk action
    setSelectedRows([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedRows([]); // Clear selections when changing pages
  };

  return (
    <div className="w-full">
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

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="relative">
          {selectedRows.length > 0 && (
            <BulkActions
              selectedCount={selectedRows.length}
              onAction={handleBulkAction}
              type={type}
            />
          )}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <TableHeader
                  headers={headers}
                  checkbox={checkbox}
                  toggleAll={toggleAll}
                  checked={checked}
                  indeterminate={indeterminate}
                />
                <tbody className="divide-y divide-gray-200">
                  {currentRows.map((row, index) => (
                    <TableRow
                      key={index}
                      row={row}
                      selected={selectedRows.includes(row)}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      onRowClick={onRowClick}
                      type={type}
                      menuItems={menuItems}
                      drawerContent={drawerContent}
                      drawerTitle={drawerTitle}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200">
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={rows.length}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
}
