import React, { useCallback } from 'react';
import { StatusBadge } from '../ui/status-badge';
import ActionMenu from './ActionMenu';
import PaymentActionMenu from './PaymentActionMenu';
import { cn } from '../../lib/utils';

export default function TableRow({ row, selected, selectedRows, setSelectedRows, onRowClick, type = 'default' }) {
  const toggle = useCallback((e) => {
    e.stopPropagation();
    setSelectedRows(
      e.target.checked
        ? [...selectedRows, row]
        : selectedRows.filter((r) => r !== row)
    );
  }, [row, selectedRows, setSelectedRows]);

  const handleAction = useCallback((action, data) => {
    switch (action) {
      case 'activate':
      case 'deactivate':
        onRowClick?.(row, { type: action });
        break;
      case 'edit':
        onRowClick?.(row, { type: 'edit' });
        break;
      case 'view':
      case 'confirm':
      case 'cancel':
      case 'receipt':
        onRowClick?.(row, { type: action });
        break;
      case 'payTax':
        onRowClick?.(row, { type: 'payTax', ...data });
        break;
      default:
        break;
    }
  }, [row, onRowClick]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRowClick?.(row);
    }
  }, [row, onRowClick]);

  const renderCell = useCallback((value, idx, rowData) => {
    const keys = Object.keys(rowData);
    const key = keys[idx];
    
    // If this is the status column (excluding date)
    if (key === 'status') {
      return <StatusBadge status={value || 'Unknown'} />;
    }
    
    // Plain text for date and other fields
    return <span className="text-gray-900">{value}</span>;
  }, []);

  const ActionMenuComponent = type === 'payment' ? PaymentActionMenu : ActionMenu;

  return (
    <tr
      onClick={() => onRowClick?.(row)}
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
      {Object.entries(row).map(([key, value], idx) => (
        <td 
          key={key}
          className="px-3 py-4 text-sm text-gray-900"
        >
          {renderCell(value, idx, row)}
        </td>
      ))}
      <td className="w-20 px-3 py-4">
        <div className="flex justify-center">
          <ActionMenuComponent 
            status={row.status || 'Unknown'}
            onAction={handleAction}
            row={row}
          />
        </div>
      </td>
    </tr>
  );
}
