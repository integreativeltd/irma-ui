import React, { useState } from 'react';
import TableWrapper from '../../components/tables/TableWrapper';

export default function Invoices() {
  const [search, setSearch] = useState('');

  const headers = ['Invoice ID', 'Taxpayer', 'Amount', 'Due Date', 'Revenue Stream', 'Status'];

  // Sample data - replace with actual API call
  const invoices = [
    {
      invoiceId: 'INV-2024-001',
      taxpayer: 'Dangote Industries Limited',
      amount: '₦12,500,000',
      dueDate: '2024-04-30',
      revenueStream: 'Personal Income Tax',
      status: 'Pending'
    },
    {
      invoiceId: 'INV-2024-002',
      taxpayer: 'MTN Nigeria Communications Plc',
      amount: '₦8,750,000',
      dueDate: '2024-04-15',
      revenueStream: 'Business Premises',
      status: 'Paid'
    },
    {
      invoiceId: 'INV-2024-003',
      taxpayer: 'Zenith Bank Plc',
      amount: '₦15,300,000',
      dueDate: '2024-05-01',
      revenueStream: 'Personal Income Tax',
      status: 'Overdue'
    }
  ];

  const handleRowAction = (row, action) => {
    switch (action.type) {
      case 'view':
        console.log('Viewing invoice:', row);
        break;
      case 'edit':
        console.log('Editing invoice:', row);
        break;
      case 'download':
        console.log('Downloading invoice:', row);
        break;
      default:
        break;
    }
  };

  const filteredInvoices = invoices.filter((invoice) =>
    `${invoice.taxpayer} ${invoice.invoiceId}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-end">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
          >
            Generate Invoice
          </button>
        </div>
      </div>

      <TableWrapper
        title="Invoices"
        subtitle="View and manage tax invoices"
        headers={headers}
        rows={filteredInvoices}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search invoices..."
        onRowClick={handleRowAction}
      />
    </div>
  );
}