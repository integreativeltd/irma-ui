import React, { useCallback } from 'react';
import { StatusBadge } from '../ui/status-badge';
import ActionMenu from './ActionMenu';
import { cn } from '../../lib/utils';

export default function TableRow({ 
  row, 
  selected, 
  selectedRows, 
  setSelectedRows, 
  onRowClick,
  menuItems,
  drawerContent,
  drawerTitle 
}) {
  const toggle = useCallback((e) => {
    e.stopPropagation();
    setSelectedRows(
      e.target.checked
        ? [...selectedRows, row]
        : selectedRows.filter((r) => r !== row)
    );
  }, [row, selectedRows, setSelectedRows]);

  const handleAction = useCallback((data, action) => {
    if (typeof action === 'string') {
      onRowClick?.(row, { type: action, data });
    } else {
      onRowClick?.(row, action);
    }
  }, [row, onRowClick]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  }, []);

  const renderCell = useCallback((value, key) => {
    if (key.startsWith('_')) {
      return null;
    }

    if (key === 'status') {
      return <StatusBadge status={value || 'Unknown'} />;
    }

    if (value === null || value === undefined) {
      return '-';
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return <span className="text-gray-900">{value}</span>;
  }, []);

  return (
    <tr
      onKeyDown={handleKeyDown}
      className={cn(selected ? 'bg-gray-50' : 'bg-white')}
      tabIndex={0}
      role="row"
      aria-selected={selected}
    >
      <td className="w-12 px-3 sm:w-16">
        <div className="flex justify-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 focus:ring-2 focus:ring-offset-2"
            checked={selected}
            onChange={toggle}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Select ${row.name || row.taxpayerName || 'row'}`}
          />
        </div>
      </td>
      {Object.entries(row).map(([key, value]) => 
        key.startsWith('_') ? null : (
          <td key={key} className="px-3 py-4 text-sm text-gray-900">
            {renderCell(value, key)}
          </td>
        )
      )}
      <td className="w-20 px-3 py-4">
        <div className="flex justify-center">
          {menuItems && (
            <ActionMenu 
              row={row}
              onAction={handleAction}
              menuItems={typeof menuItems === 'function' ? menuItems(row) : menuItems}
              drawerContent={drawerContent}
              drawerTitle={drawerTitle}
            />
          )}
        </div>
      </td>
    </tr>
  );
}
