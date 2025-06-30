import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { paymentApi } from '../features/payments/api';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function ManualPayment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!form.taxpayerId?.trim()) {
      setError('Taxpayer ID is required');
      return;
    }

    if (!form.name?.trim()) {
      setError('Taxpayer Name is required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('taxpayerId', form.taxpayerId.trim());
      formData.append('taxpayerName', form.name.trim());
      formData.append('amount', parseFloat(form.amount).toString());
      formData.append('method', form.method);
      formData.append('status', 'Pending');
      formData.append('paymentDate', new Date(form.paymentDate).toISOString().slice(0, 19));
      if (form.slip) {
        formData.append('slip', form.slip);
      }

      const response = await paymentApi.createPayment(formData, user?.tenantId || 'default', user?.id);
      if (!response?.paymentId) {
        throw new Error('No payment ID received from server');
      }
      setConfirmationNumber(response.paymentId);
      setSubmitted(true);

      // Refresh the payments list before navigating back
      await paymentApi.getPayments(user?.tenantId || 'default');
    } catch (err) {
      setError(err.message || 'Failed to process payment');
      console.error('Payment error:', err);
    }
  };

  const handleBackToPayments = () => {
    navigate('/payments', { 
      state: { 
        paymentId: confirmationNumber,
        refresh: true 
      } 
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manual Payment Entry</h1>

      {error && (
        <div className="mb-4 p-3 text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

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
              min="0"
              step="0.01"
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
              type="datetime-local"
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
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/payments')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Payment
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-green-100 p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-green-800">Payment Recorded</h2>
          <p>
            Confirmation Number: <span className="font-bold">{confirmationNumber}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">Payment has been recorded and is pending confirmation.</p>
          <button
            onClick={handleBackToPayments}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Back to Payments
          </button>
        </div>
      )}
    </div>
  );
}
