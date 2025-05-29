import React from "react";
import { Card, CardContent } from "../../../components/ui/card";

export const DashboardSection = () => {
  const dashboardData = [
    { title: "Total Revenue Collected", value: "₦1.45B" },
    { title: "Average Tax Per Payer", value: "₦12,850.25" },
    { title: "Manual Payments Logged", value: "345" },
    { title: "Online Payments Processed", value: "1,023" },
  ];

  return (
    <section className="flex flex-wrap w-full gap-4 py-6">
      {dashboardData.map((item, index) => (
        <Card
          key={index}
          className="flex-1 min-w-[200px] border border-gray-200 rounded-lg shadow-sm bg-white"
        >
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">{item.title}</p>
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
