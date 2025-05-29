import React from 'react';
import { cn } from '../../lib/utils';

const STATUS_STYLES = {
  // Payment statuses
  pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  confirmed: 'bg-green-50 text-green-700 ring-green-600/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
  completed: 'bg-green-50 text-green-700 ring-green-600/20',
  failed: 'bg-red-50 text-red-700 ring-red-600/20',
  processing: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  
  // Standard statuses
  active: 'bg-green-50 text-green-700 ring-green-600/20',
  inactive: 'bg-gray-50 text-gray-700 ring-gray-600/20',
  suspended: 'bg-red-50 text-red-700 ring-red-600/20',
  draft: 'bg-gray-50 text-gray-600 ring-gray-500/20',
  
  // Default/unknown status
  default: 'bg-gray-50 text-gray-600 ring-gray-500/20'
};

export function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase() || 'default';
  const style = STATUS_STYLES[normalizedStatus] || STATUS_STYLES.default;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        style
      )}
    >
      {status}
    </span>
  );
}