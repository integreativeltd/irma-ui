import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";
import RevenueTrendChart from "../charts/RevenueTrendChart";

export const RevenueTrendSection = () => {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm bg-white">
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <RevenueTrendChart />
      </CardContent>
    </Card>
  );
};
