import React, { useState } from 'react';

export default function ManualPayment() {
  const [form, setForm] = useState({
    taxpayerId: '',
    name: '',
    amount: '',
    method: '',
    paymentDate: '',
    slip: null,
  });

  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate backend processing and confirmation generation
    const fakeConfirmation = `CONF-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationNumber(fakeConfirmation);
    setSubmitted(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manual Payment Entry</h1>

      {!submitted ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Taxpayer ID</label>
            <input
              type="text"
              name="taxpayerId"
              value={form.taxpayerId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Taxpayer Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Amount Paid (₦)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Payment Method</label>
            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="USSD">USSD</option>
              <option value="Bank Deposit">Bank Deposit</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Payment Date</label>
            <input
              type="date"
              name="paymentDate"
              value={form.paymentDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Upload Payment Slip</label>
            <input
              type="file"
              name="slip"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              accept="image/*,.pdf"
              required
            />
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Payment
          </button>
        </form>
      ) : (
        <div className="bg-green-100 p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Payment Recorded</h2>
          <p>
            Confirmation Number: <span className="font-bold">{confirmationNumber}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">A receipt will be sent to the taxpayer via SMS/email.</p>
        </div>
      )}
    </div>
  );
}
