import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListOrdered,
  PlusCircle,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  // 1. State to manage collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`relative min-h-screen border-r bg-white transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* --- COLLAPSE TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-blue-600 text-white rounded-full p-1 shadow-md hover:bg-blue-700 transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* --- LOGO / BRAND AREA --- */}
      <div
        className={`p-6 mb-4 flex items-center ${
          isCollapsed ? "justify-center" : "gap-3"
        }`}
      >
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <ShoppingBag size={24} />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold text-gray-800 whitespace-nowrap">
            ShopAdmin
          </span>
        )}
      </div>

      {/* --- NAV LINKS --- */}
      <div className="flex flex-col gap-2 px-3">
        <SidebarLink
          to="/dashboard"
          icon={<LayoutDashboard size={22} />}
          label="Dashboard"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/list"
          icon={<ListOrdered size={22} />}
          label="List Items"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/orders"
          icon={<ShoppingBag size={22} />}
          label="Orders"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/add"
          icon={<PlusCircle size={22} />}
          label="Add Items"
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
};

// --- HELPER COMPONENT FOR LINKS ---
const SidebarLink = ({ to, icon, label, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-3 py-3 rounded-lg transition-all group ${
          isActive
            ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 rounded-r-none"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        }`
      }
    >
      <div className="min-w-[24px]">{icon}</div>
      {!isCollapsed && (
        <span className="font-medium whitespace-nowrap transition-opacity duration-200">
          {label}
        </span>
      )}

      {/* Tooltip for collapsed mode */}
      {isCollapsed && (
        <div className="absolute left-16 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100]">
          {label}
        </div>
      )}
    </NavLink>
  );
};

export default Sidebar;
