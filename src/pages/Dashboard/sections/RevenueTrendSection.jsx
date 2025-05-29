import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";
import RevenueTrendChart from "../charts/RevenueTrendChart";

export const RevenueTrendSection = () => {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm bg-white">
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Revenue Trend</h3>
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <RevenueTrendChart />
      </CardContent>
    </Card>
  );
};
