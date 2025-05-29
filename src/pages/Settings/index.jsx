import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold mb-6">Tenant Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Organization Details */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Organization Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <Input
                  type="text"
                  defaultValue="Demo Organization"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  defaultValue="contact@demo.org"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  defaultValue="+234 800 123 4567"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Input
                  type="text"
                  defaultValue="123 Demo Street, Lagos"
                  className="w-full"
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">System Configuration</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fiscal Year Start
                </label>
                <Select defaultValue="january">
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Currency
                </label>
                <Select defaultValue="ngn">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngn">Nigerian Naira (₦)</SelectItem>
                    <SelectItem value="usd">US Dollar ($)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="gbp">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Zone
                </label>
                <Select defaultValue="lagos">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lagos">Africa/Lagos</SelectItem>
                    <SelectItem value="london">Europe/London</SelectItem>
                    <SelectItem value="newyork">America/New_York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Notifications
                </label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="important">Important Only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMS Notifications
                </label>
                <Select defaultValue="important">
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="important">Important Only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">API Configuration</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <Input
                  type="text"
                  defaultValue="sk_test_123456789"
                  className="w-full font-mono"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook URL
                </label>
                <Input
                  type="url"
                  defaultValue="https://api.example.com/webhooks"
                  className="w-full"
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-[#12496b] text-white rounded-md hover:bg-[#0f3a55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#12496b] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}