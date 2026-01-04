import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data for the "Top Selling Products"
  const topProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      sales: 120,
      price: "$199.99",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Mechanical Gaming Keyboard",
      sales: 85,
      price: "$89.50",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "4K Ergonomic Monitor",
      sales: 64,
      price: "$450.00",
      status: "In Stock",
    },
  ];

  return (
    // <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
    <main className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
        <h2 className="text-xl font-semibold">Business Overview</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Jan 02, 2026</span>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            JD
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* --- KPI STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            trend="+12.5%"
            icon={<DollarSign />}
            up
          />
          <StatCard
            title="Total Orders"
            value="1,205"
            trend="+8.2%"
            icon={<ShoppingBag />}
            up
          />
          <StatCard
            title="Active Customers"
            value="8,432"
            trend="-2.4%"
            icon={<Users />}
          />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            trend="+1.1%"
            icon={<TrendingUp />}
            up
          />
        </div>

        {/* --- CHARTS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Bar Chart Placeholder */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Monthly Sales Performance</h3>
              <select className="text-sm border-gray-300 rounded-md focus:ring-blue-500">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            {/* This is where you'd integrate Chart.js or Recharts */}
            <div className="h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
              [Sales Bar Chart UI Component - Use Recharts/Chart.js here]
            </div>
          </div>

          {/* Top Products Table/List */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Top Selling Products</h3>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                  <span className="text-sm font-semibold">{product.price}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-sm text-blue-600 font-medium hover:underline">
              View Full Report
            </button>
          </div>
        </div>

        {/* --- RECENT ORDERS TABLE --- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <TableRow
                  id="#ORD-7732"
                  customer="Sarah Smith"
                  status="Completed"
                  amount="$120.50"
                />
                <TableRow
                  id="#ORD-7731"
                  customer="Mike Johnson"
                  status="Pending"
                  amount="$45.00"
                />
                <TableRow
                  id="#ORD-7730"
                  customer="Robert Brown"
                  status="Processing"
                  amount="$892.10"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

// Helper Components for Clean Code
const NavItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
      active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

const StatCard = ({ title, value, trend, icon, up = false }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-gray-50 rounded-lg text-gray-600">{icon}</div>
      <div
        className={`flex items-center text-xs font-medium ${
          up ? "text-green-600" : "text-red-600"
        }`}
      >
        {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className="text-2xl font-bold">{value}</h4>
    </div>
  </div>
);

const TableRow = ({ id, customer, status, amount }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 text-sm font-medium text-blue-600">{id}</td>
    <td className="px-6 py-4 text-sm text-gray-700">{customer}</td>
    <td className="px-6 py-4">
      <span
        className={`px-2 py-1 text-xs rounded-full font-medium ${
          status === "Completed"
            ? "bg-green-100 text-green-700"
            : status === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-sm font-semibold">{amount}</td>
  </tr>
);

export default AdminDashboard;
