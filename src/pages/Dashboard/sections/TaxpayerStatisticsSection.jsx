import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import TotalTaxpayersChart from "../charts/TotalTaxpayersChart";

const monthlyTaxpayerData = [
  { month: "Jan", value: 130 },
  { month: "Feb", value: 145 },
  { month: "Mar", value: 200 }, // Highlighted
  { month: "Apr", value: 220 },
  { month: "May", value: 250 },
  { month: "June", value: 180 },
];

export default function TaxpayerStatisticsSection() {
  return (
    <Card className="w-full h-[340px] bg-white rounded-[10px] border border-gray-200 shadow-sm">
      <CardContent className="p-6 h-full relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Taxpayer Statistics</h3>
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days" className="cursor-pointer">Last 30 Days</SelectItem>
              <SelectItem value="3months" className="cursor-pointer">Last 3 Months</SelectItem>
              <SelectItem value="6months" className="cursor-pointer">Last 6 Months</SelectItem>
              <SelectItem value="1year" className="cursor-pointer">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TotalTaxpayersChart />
      </CardContent>
    </Card>
  );
}
