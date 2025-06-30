import React, { useState, useEffect } from 'react';
import { InputField } from '../Inpute/InputField';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';

export const TaxpayerForm = ({ onSuccess, onCancel, isEditing = false, initialData = null }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    type: 'Individual'
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        taxId: initialData.taxId || '',
        type: initialData.type || 'Individual'
      });
    }
  }, [isEditing, initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user makes changes
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (field === 'taxId') {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');
    setLoading(true);

    try {
      if (isEditing) {
        const response = await api.put(`/api/taxpayers/${initialData.id}`, formData, {
          headers: {
            'X-Tenant-ID': user?.tenantId || 'default',
            'X-User-ID': user?.id
          }
        });
        onSuccess(response.data);
      } else {
        await onSuccess(formData, setGeneralError);
      }

      if (!isEditing) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          taxId: '',
          type: 'Individual'
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setGeneralError(err.message || 'An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center p-6">
      <div className="w-full max-w-[500px]">
        <h3 className="mb-4 text-2xl font-semibold text-gray-700">
          {isEditing ? 'Edit Taxpayer' : 'Add New Taxpayer'}
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          {isEditing ? 'Update the taxpayer details below' : 'Fill in the taxpayer details below'}
        </p>
        {generalError && (
          <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
            {generalError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="taxId"
            label="Tax ID"
            value={formData.taxId}
            onChange={(value) => handleChange('taxId', value)}
            required
            placeholder="TAX-12345"
            error={errors.taxId}
          />

          <InputField
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={(value) => handleChange('name', value)}
            required
            placeholder="John Doe"
            error={errors.name}
          />
          
          <InputField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => handleChange('email', value)}
            required
            placeholder="example@email.com"
            error={errors.email}
          />
          
          <InputField
            id="phone"
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(value) => handleChange('phone', value)}
            required
            placeholder="+1234567890"
            error={errors.phone}
          />
          
          <InputField
            id="address"
            label="Address"
            value={formData.address}
            onChange={(value) => handleChange('address', value)}
            required
            placeholder="123 Street Name, City"
            error={errors.address}
          />
          
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className={`block w-full px-3 py-2 text-base border ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              } bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#12496b] focus:border-[#12496b]`}
            >
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type}</p>
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
              {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Taxpayer' : 'Create Taxpayer')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};