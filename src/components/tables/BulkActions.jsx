import React from 'react';
import { Power, XCircle, CheckCircle2, Trash2 } from 'lucide-react';

const PAYMENT_ACTIONS = [
  { id: 'confirm', label: 'Confirm Selected', icon: CheckCircle2, className: 'text-green-600 hover:text-green-700' },
  { id: 'cancel', label: 'Cancel Selected', icon: XCircle, className: 'text-red-600 hover:text-red-700' }
];

const STANDARD_ACTIONS = [
  { id: 'activate', label: 'Activate Selected', icon: Power, className: 'text-green-600 hover:text-green-700' },
  { id: 'deactivate', label: 'Deactivate Selected', icon: Power, className: 'text-red-600 hover:text-red-700' },
  { id: 'delete', label: 'Delete Selected', icon: Trash2, className: 'text-red-600 hover:text-red-700' }
];

export default function BulkActions({ selectedCount, onAction, type = 'default' }) {
  const actions = type === 'payment' ? PAYMENT_ACTIONS : STANDARD_ACTIONS;

  return (
    <div className="absolute top-0 left-14 flex h-12 items-center space-x-3 bg-white sm:left-12">
      <div className="text-sm font-medium text-gray-900">
        {selectedCount} selected
      </div>
      {actions.map(({ id, label, icon: Icon, className }) => (
        <button
          key={id}
          type="button"
          className={`inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold ${className} shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => onAction(id)}
        >
          <Icon className="h-4 w-4 mr-1" aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  );
}
