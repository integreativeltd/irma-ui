import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function LayoutWrapper({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-[220px]">
        <Header />
        <main className="pt-16 p-6 min-h-screen bg-[#f6f7f9]">
          {children}
        </main>
      </div>
    </div>
  );
}
