import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/layout/Sidebar";
import Header from "../components/shared/layout/Header";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? 80 : 250;

  return (
<div className="flex min-h-screen bg-[#f7f9fc]">
  <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
  <div className="flex-1" style={{ marginLeft: sidebarWidth }}>
    <Header user={user} logout={logout} sidebarWidth={sidebarWidth} />
    <main className="flex-1 pt-[120px] px-6 pb-6">
    <Outlet />
    </main>
  </div>
</div>

  );
}
