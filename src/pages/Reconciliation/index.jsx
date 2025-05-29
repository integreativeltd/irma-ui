import React, { useState } from 'react';
import TableWrapper from '../../components/tables/TableWrapper';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';
import { Card, CardContent } from '../../components/ui/card';

export default function Reconciliation() {
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('this-month');

  const headers = ['Transaction ID', 'Bank Reference', 'Amount', 'Bank', 'Date', 'Status', 'Variance'];

  // Sample data - replace with actual API call
  const transactions = [
    {
      transactionId: 'TRX-001',
      bankRef: 'BNK1234567',
      amount: '₦5,450,000',
      bank: 'First Bank',
      date: '2024-03-15',
      status: 'Matched',
      variance: '₦0'
    },
    {
      transactionId: 'TRX-002',
      bankRef: 'BNK1234568',
      amount: '₦3,200,000',
      bank: 'Zenith Bank',
      date: '2024-03-15',
      status: 'Unmatched',
      variance: '₦50,000'
    },
    {
      transactionId: 'TRX-003',
      bankRef: 'BNK1234569',
      amount: '₦8,750,000',
      bank: 'GTBank',
      date: '2024-03-14',
      status: 'Matched',
      variance: '₦0'
    }
  ];

  const handleRowAction = (row, action) => {
    switch (action.type) {
      case 'view':
        console.log('Viewing transaction:', row);
        break;
      case 'resolve':
        console.log('Resolving variance:', row);
        break;
      default:
        break;
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    `${transaction.transactionId} ${transaction.bankRef}`.toLowerCase().includes(search.toLowerCase())
  );

  const summary = {
    totalTransactions: transactions.length,
    matchedTransactions: transactions.filter(t => t.status === 'Matched').length,
    unmatchedTransactions: transactions.filter(t => t.status === 'Unmatched').length,
    totalVariance: '₦50,000'
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
            <p className="mt-2 text-3xl font-semibold">{summary.totalTransactions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Matched</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">{summary.matchedTransactions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Unmatched</h3>
            <p className="mt-2 text-3xl font-semibold text-red-600">{summary.unmatchedTransactions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Variance</h3>
            <p className="mt-2 text-3xl font-semibold text-orange-600">{summary.totalVariance}</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        <button
          type="button"
          className="block rounded-md bg-[#12496b] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3a55] focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-[#0f3a55] cursor-pointer"
        >
          Run Reconciliation
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <TableWrapper
          title="Bank Reconciliation"
          subtitle="Match and reconcile bank statements with system records"
          headers={headers}
          rows={filteredTransactions}
          search={search}
          setSearch={setSearch}
          searchPlaceholder="Search transactions..."
          onRowClick={handleRowAction}
        />
      </div>
    </div>
  );
}