import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import TableWrapper from '../../components/tables/TableWrapper';

export default function RevenueStreams() {
  const [search, setSearch] = useState('');

  const headers = ['Stream ID', 'Name', 'Type', 'Rate (%)', 'Total Collection', 'Status'];

  // Sample data - replace with actual API call
  const revenueStreams = [
    {
      streamId: 'RS001',
      name: 'Personal Income Tax',
      type: 'Direct Tax',
      rate: '24',
      totalCollection: '₦245,000,000',
      status: 'Active'
    },
    {
      streamId: 'RS002',
      name: 'Vehicle Registration',
      type: 'Fee',
      rate: '10',
      totalCollection: '₦89,000,000',
      status: 'Active'
    },
    {
      streamId: 'RS003',
      name: 'Business Premises',
      type: 'License',
      rate: '15',
      totalCollection: '₦156,000,000',
      status: 'Active'
    }
  ];

  const handleRowAction = (row, action) => {
    switch (action.type) {
      case 'edit':
        console.log('Editing revenue stream:', row);
        break;
      case 'activate':
        console.log('Activating revenue stream:', row);
        break;
      case 'deactivate':
        console.log('Deactivating revenue stream:', row);
        break;
      default:
        break;
    }
  };

  const filteredStreams = revenueStreams.filter((stream) =>
    `${stream.name} ${stream.streamId}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-end">
        <div className="mt-4 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
          >
            Add Revenue Stream
          </button>
        </div>
      </div>

      <TableWrapper
        title="Revenue Streams"
        subtitle="Manage your revenue streams and tax types"
        headers={headers}
        rows={filteredStreams}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search revenue streams..."
        onRowClick={handleRowAction}
      />
    </div>
  );
}