import React, { useState } from 'react';
import { InputField } from '../Inpute/InputField';
import { useAuth } from '../../hooks/useAuth';
import { paymentApi } from '../../features/payments/api';

export const ManualPaymentForm = ({ taxpayer, onSuccess, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    method: '',
    paymentDate: new Date().toISOString().split('T')[0],
    slip: null
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, slip: file }));
      if (errors.slip) {
        setErrors(prev => ({ ...prev, slip: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    setLoading(true);

    try {
      const formPayload = new FormData();
      // Format amount as a number
      formPayload.append('amount', parseFloat(formData.amount).toString());
      formPayload.append('method', formData.method);
      // Format date properly for LocalDateTime
      formPayload.append('paymentDate', new Date(formData.paymentDate).toISOString().slice(0, 19));
      // Add required taxpayer information
      formPayload.append('taxpayerId', taxpayer.taxId);
      formPayload.append('taxpayerName', taxpayer.name);
      // Handle slip file if present
      if (formData.slip) {
        formPayload.append('slip', formData.slip);
      }

      const response = await paymentApi.createPayment(
        formPayload,
        user?.tenantId || 'default',
        user?.id
      );
      console.log('Payment processed successfully:', response);
      onSuccess(response);
    } catch (err) {
      console.error('Payment error:', err);
      if (err.response?.data?.errors) {
        const fieldErrors = {};
        err.response.data.errors.forEach(error => {
          fieldErrors[error.field] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        setGeneralError(err.message || 'Failed to process payment');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center p-6">
      <div className="w-full max-w-[500px]">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">Taxpayer Details</h3>
          <div className="mt-2 text-sm text-gray-600">
            <p>Name: {taxpayer.name}</p>
            <p>Tax ID: {taxpayer.taxId}</p>
          </div>
        </div>

        {generalError && (
          <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="amount"
            label="Amount (₦)"
            type="number"
            value={formData.amount}
            onChange={(value) => handleChange('amount', value)}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            error={errors.amount}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="method" className="text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="method"
              value={formData.method}
              onChange={(e) => handleChange('method', e.target.value)}
              className={`block w-full px-3 py-2 text-base border ${
                errors.method ? 'border-red-500' : 'border-gray-300'
              } bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#12496b] focus:border-[#12496b]`}
              required
            >
              <option value="">Select payment method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Bank Deposit">Bank Deposit</option>
              <option value="USSD">USSD</option>
              <option value="Card">Card</option>
            </select>
            {errors.method && (
              <p className="mt-1 text-sm text-red-600">{errors.method}</p>
            )}
          </div>

          <InputField
            id="paymentDate"
            label="Payment Date"
            type="datetime-local"
            value={formData.paymentDate}
            onChange={(value) => handleChange('paymentDate', value)}
            required
            error={errors.paymentDate}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="slip" className="text-sm font-medium text-gray-700">
              Payment Slip (if available)
            </label>
            <input
              id="slip"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#12496b] file:text-white hover:file:bg-[#0f3a55] ${
                errors.slip ? 'border-red-500' : ''
              }`}
            />
            {errors.slip && (
              <p className="mt-1 text-sm text-red-600">{errors.slip}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#12496b] border border-transparent rounded-lg shadow-sm hover:bg-[#0f3a55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#12496b]"
            >
              {loading ? 'Processing...' : 'Process Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};