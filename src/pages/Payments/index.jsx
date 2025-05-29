import React, { useState, useEffect } from 'react';

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Simulated API response
    const dummyPayments = [
      {
        id: 'PMT001',
        taxpayerName: 'John Doe',
        amount: 5000,
        method: 'Paystack',
        status: 'Confirmed',
        date: '2024-05-01',
      },
      {
        id: 'PMT002',
        taxpayerName: 'Jane Smith',
        amount: 8000,
        method: 'Bank Transfer',
        status: 'Pending',
        date: '2024-05-05',
      },
    ];
    setPayments(dummyPayments);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      <table className="min-w-full border border-gray-300 rounded overflow-hidden shadow">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3 border">Payment ID</th>
            <th className="p-3 border">Taxpayer</th>
            <th className="p-3 border">Amount (₦)</th>
            <th className="p-3 border">Method</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="p-3 border">{payment.id}</td>
              <td className="p-3 border">{payment.taxpayerName}</td>
              <td className="p-3 border">₦{payment.amount.toLocaleString()}</td>
              <td className="p-3 border">{payment.method}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded text-sm font-semibold
                  ${payment.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {payment.status}
                </span>
              </td>
              <td className="p-3 border">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
