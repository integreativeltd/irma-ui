import React, { useState } from 'react';

export default function Reports() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [category, setCategory] = useState('');

  const handleExport = (type) => {
    alert(`Exporting ${type} for reports from ${fromDate || 'start'} to ${toDate || 'today'} in category ${category || 'All'}`);
    // Simulate file download
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Revenue Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">All</option>
            <option value="personal_tax">Personal Income Tax</option>
            <option value="motor_license">Motor Licensing</option>
            <option value="land_use">Land Use Charge</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleExport('PDF')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export PDF
        </button>
        <button
          onClick={() => handleExport('Excel')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export Excel
        </button>
      </div>
    </div>
  );
}
