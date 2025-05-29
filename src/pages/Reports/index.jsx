import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function Reports() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [category, setCategory] = useState('all');

  const handleExport = (type) => {
    alert(`Exporting ${type} for reports from ${fromDate || 'start'} to ${toDate || 'today'} in category ${category || 'All'}`);
    // Simulate file download
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-6">Report Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From Date</label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To Date</label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Revenue Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="personal_tax">Personal Income Tax</SelectItem>
                  <SelectItem value="motor_license">Motor Licensing</SelectItem>
                  <SelectItem value="land_use">Land Use Charge</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button 
              onClick={() => handleExport('PDF')}
              className="bg-[#12496b] hover:bg-[#0f3a55]"
            >
              Export PDF
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExport('Excel')}
              className="border-[#12496b] text-[#12496b] hover:bg-[#12496b] hover:text-white"
            >
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview Card */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Report Preview</h2>
          <div className="text-gray-500 text-sm">
            Select filters above and click export to generate your report
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
