import React, { useState } from 'react';
import { InputField } from '../../components/Inpute/InputField';
import { PasswordInput } from '../../components/Inpute/PasswordInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const ROLES = {
  ADMIN: 'Admin',
  SUPERVISOR: 'Supervisor',
  TAX_OFFICER: 'Tax Officer'
};

export function AddUserForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    roles: []
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name?.trim()) {
      setError('Name is required');
      return;
    }

    if (!form.email?.trim()) {
      setError('Email is required');
      return;
    }

    if (!form.password) {
      setError('Password is required');
      return;
    }

    if (!form.roles.length) {
      setError('At least one role must be selected');
      return;
    }

    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message || 'Failed to create user');
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <InputField
        id="name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={form.name}
        onChange={(value) => handleChange('name', value)}
        required
      />

      <InputField
        id="email"
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        value={form.email}
        onChange={(value) => handleChange('email', value)}
        required
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="••••••••"
        value={form.password}
        onChange={(value) => handleChange('password', value)}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Roles
        </label>
        <Select
          multiple
          value={form.roles}
          onValueChange={(roles) => handleChange('roles', roles)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select roles" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(ROLES).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#12496b] text-white rounded-md hover:bg-[#0f3a55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#12496b]"
        >
          Create User
        </button>
      </div>
    </form>
  );
}