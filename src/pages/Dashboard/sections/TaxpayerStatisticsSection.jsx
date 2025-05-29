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
      <TotalTaxpayersChart />
      </CardContent>
    </Card>
  );
}
