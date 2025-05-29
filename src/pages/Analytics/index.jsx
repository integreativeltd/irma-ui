import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../components/ui/select';
import RevenueTrendChart from '../Dashboard/charts/RevenueTrendChart';
import TotalTaxpayersChart from '../Dashboard/charts/TotalTaxpayersChart';

export default function Analytics() {
  const [period, setPeriod] = useState('this-month');

  const metrics = [
    { title: 'Total Revenue', value: '₦1.45B', change: '+12.5%', trend: 'up' },
    { title: 'Active Taxpayers', value: '2,450', change: '+5.2%', trend: 'up' },
    { title: 'Collection Rate', value: '85%', change: '-2.1%', trend: 'down' },
    { title: 'Average Payment', value: '₦592,000', change: '+8.3%', trend: 'up' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Period Selector */}
      <div className="flex justify-end mb-6">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
              <div className={`mt-2 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <RevenueTrendChart />
        </Card>

        {/* Taxpayer Growth */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Taxpayer Growth</h3>
          <TotalTaxpayersChart />
        </Card>

        {/* Revenue by Stream */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Stream</h3>
          <div className="space-y-4">
            {[
              { name: 'Personal Income Tax', amount: '₦580M', percentage: 40 },
              { name: 'Business Premises', amount: '₦435M', percentage: 30 },
              { name: 'Vehicle Registration', amount: '₦290M', percentage: 20 },
              { name: 'Others', amount: '₦145M', percentage: 10 },
            ].map((stream, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{stream.name}</span>
                  <span>{stream.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#12496b] h-2 rounded-full"
                    style={{ width: `${stream.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Collection Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Collection Performance</h3>
          <div className="space-y-6">
            {[
              { label: 'Target', amount: '₦2B' },
              { label: 'Collected', amount: '₦1.45B' },
              { label: 'Variance', amount: '₦550M' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{item.label}</span>
                <span className="text-xl font-semibold">{item.amount}</span>
              </div>
            ))}
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-[#12496b] h-4 rounded-full"
                style={{ width: '72.5%' }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              72.5% of target achieved
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}