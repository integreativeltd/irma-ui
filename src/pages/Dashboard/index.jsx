import React from "react";
import {RevenueTrendSection} from "./sections/RevenueTrendSection";
import { DashboardSection } from "./sections/DashboardSection";
import TotalTaxpayersChart from "./charts/TotalTaxpayersChart";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <DashboardSection />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueTrendSection />
        <TotalTaxpayersChart />
      </div>
    </div>
  );
}
