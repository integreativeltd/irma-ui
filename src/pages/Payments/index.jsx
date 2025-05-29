import React, { useState } from 'react';
import TableWrapper from '../../components/tables/TableWrapper';
import payments from './payments';
import { useNavigate } from 'react-router-dom';

export default function Payments() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const headers = ['Payment ID', 'Taxpayer', 'Amount (₦)', 'Method', 'Status', 'Date'];

  const handleRowAction = (row, action) => {
    switch (action.type) {
      case 'view':
        console.log('Viewing payment details:', row);
        break;
      case 'confirm':
        console.log('Confirming payment:', row);
        break;
      case 'cancel':
        console.log('Canceling payment:', row);
        break;
      case 'receipt':
        console.log('Downloading receipt for:', row);
        break;
      default:
        break;
    }
  };

  const filteredPayments = payments.filter((p) =>
    `${p.paymentId} ${p.taxpayerName}`.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filteredPayments.map(p => ({
    paymentId: p.paymentId,
    taxpayerName: p.taxpayerName,
    amount: new Intl.NumberFormat('en-NG', { 
      style: 'decimal'
    }).format(p.amount),
    method: p.method,
    status: p.status,
    date: new Date(p.date).toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-end">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
            onClick={() => navigate('/manual-payment')}
          >
            Record Payment
          </button>
        </div>
      </div>

      <TableWrapper
        title="Payments"
        subtitle="A list of all tax payments recorded in the system."
        headers={headers}
        rows={rows}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search payments..."
        onRowClick={handleRowAction}
        type="payment"
      />
    </div>
  );
}
