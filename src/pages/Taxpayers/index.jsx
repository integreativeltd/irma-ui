import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import TableWrapper from '../../components/tables/TableWrapper';
import taxpayers from './taxpayers';

export default function Taxpayers() {
  const tenant = useTenant();
  const [search, setSearch] = useState('');
  const headers = ['Taxpayer ID', 'Name', 'Email', 'Status'];

  const handleRowAction = (row, action) => {
    switch (action.type) {
      case 'edit':
        // Handle edit action
        console.log('Editing taxpayer:', row);
        break;
      case 'payTax':
        // Handle pay tax action with amount, method, and other details
        console.log('Processing payment:', {
          taxpayer: row,
          amount: action.amount,
          method: action.method,
          paymentDate: action.paymentDate,
          confirmationNumber: action.confirmationNumber,
          slip: action.slip
        });
        // Here you would typically make an API call to process the payment
        break;
      case 'activate':
        console.log('Activating taxpayer:', row);
        break;
      case 'deactivate':
        console.log('Deactivating taxpayer:', row);
        break;
      default:
        break;
    }
  };

  const filteredTaxpayers = taxpayers.filter((t) =>
    `${t.name} ${t.taxpayerId}`.toLowerCase().includes(search.toLowerCase())
  );

  const rows = filteredTaxpayers.map(t => ({
    taxpayerId: t.taxpayerId,
    name: t.name,
    email: t.email,
    status: t.status,
  }));

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-end">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
          >
            Add Taxpayer
          </button>
        </div>
      </div>

      <TableWrapper
        title="Taxpayers"
        subtitle="A list of all taxpayers registered in your account."
        headers={headers}
        rows={rows}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search taxpayers..."
        onRowClick={handleRowAction}
      />
    </div>
  );
}