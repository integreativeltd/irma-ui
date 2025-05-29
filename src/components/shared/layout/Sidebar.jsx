import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  ClipboardList,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  MenuIcon,
  Banknote,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAuth } from "../../../hooks/useAuth";

const sections = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
    ],
  },
  {
    title: "Tax Management",
    items: [
      { label: "Taxpayers", path: "/taxpayers", icon: Users },
      { label: "Revenue Streams", path: "/revenue-streams", icon: FileText },
      { label: "Invoices", path: "/invoices", icon: ClipboardList },
    ],
  },
  {
    title: "Payments",
    items: [
      // { label: "Manual Entry", path: "/manual-payment", icon: BookOpen },
      { label: "Online Payments", path: "/payments", icon: CreditCard },
      { label: "Reconciliation", path: "/reconciliation", icon: Banknote },
    ],
  },
  {
    title: "Reports",
    items: [
      { label: "Reports", path: "/reports", icon: BarChart2 },
      { label: "Analytics", path: "/analytics", icon: BarChart2 },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Tenant Settings", path: "/settings", icon: Settings },
      { label: "Logout", path: "/logout", icon: LogOut },
    ],
  },
];

export default function Sidebar({ collapsed, setCollapsed }) {

    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
      logout();
      navigate('/login');
    };

  return (
    <aside className="h-screen w-[250px] bg-white px-4 pt-4 fixed top-0 left-0 z-[50]">
      {/* Logo */}


      {/* Hamburger aligned to right */}
      <div className="flex justify-end px-1 mb-6 mt-25">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 hover:text-black cursor-pointer"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Menu Sections */}
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              {section.title}
            </h3>
            <nav className="flex flex-col gap-1">
            {section.items.map(({ label, path, icon: Icon }) => {
                if (label === "Logout") {
                  return (
                    <button
                      key="logout"
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <Icon className="h-5 w-5" />
                      {!collapsed && <span>{label}</span>}
                    </button>
                  );
                }

                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      )
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {!collapsed && <span>{label}</span>}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
