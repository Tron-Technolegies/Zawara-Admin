import {
  FiBox,
  FiGrid,
  FiShoppingBag,
  FiChevronDown,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useState, useEffect } from "react";
import api from "../api/api";

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    total_products: 0,
    total_categories: 0,
    total_orders: 0,
    recent_orders: [],
    top_products: [],
    sales_overview: {
      total_revenue: 0,
      orders: 0,
      avg_order_value: 0,
      refunds: 0,
      growth_revenue: 0,
      growth_orders: 0,
      growth_avg_order: 0,
      growth_refunds: 0,
      chart_data: [],
    },
  });
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("dashboard/");
        setDashboardData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadDashboard();
  }, []);
  return (

    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dddddd]">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 text-sm">
                Total Categories
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {dashboardData.total_categories}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
              <FiBox size={18} />
            </div>

          </div>
        </div>


        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dddddd]">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 text-sm">
                Total Products
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {dashboardData.total_products}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
              <FiGrid size={18} />
            </div>

          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#dddddd]">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 text-sm">
                Total Orders
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {dashboardData.total_orders}
              </h3>
            </div>


            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl">
              <FiShoppingBag size={18} />
            </div>

          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold text-gray-900">Sales Overview</h3>

            {/* <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Last 7 Days
              <FiChevronDown size={16} />
            </button> */}
          </div>

          {/* Top stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {/* Total Revenue */}
            <div className="bg-[#f8fafc] rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
              <h4 className="text-4xl font-bold text-emerald-500">
                ₹{dashboardData.sales_overview?.total_revenue || 0}
              </h4>
              <p className="text-sm mt-2 text-emerald-500 font-medium">
                ↑ {dashboardData.sales_overview?.growth_revenue || 0}%{" "}
                <span className="text-gray-500 font-normal">vs last month</span>
              </p>
            </div>

            {/* Orders */}
            <div className="bg-[#f8fafc] rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-2">Orders</p>
              <h4 className="text-4xl font-bold text-blue-500">
                {dashboardData.sales_overview?.orders || 0}
              </h4>
              <p className="text-sm mt-2 text-blue-500 font-medium">
                ↑ {dashboardData.sales_overview?.growth_orders || 0}%{" "}
                <span className="text-gray-500 font-normal">vs last month</span>
              </p>
            </div>

            {/* Average Order Value */}
            <div className="bg-[#f8fafc] rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-2">Average Order Value</p>
              <h4 className="text-4xl font-bold text-violet-500">
                ₹{dashboardData.sales_overview?.avg_order_value || 0}
              </h4>
              <p className="text-sm mt-2 text-violet-500 font-medium">
                ↑ {dashboardData.sales_overview?.growth_avg_order || 0}%{" "}
                <span className="text-gray-500 font-normal">vs last month</span>
              </p>
            </div>

            {/* Refunds */}
            <div className="bg-[#f8fafc] rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-2">Refunds</p>
              <h4 className="text-4xl font-bold text-red-500">
                ₹{dashboardData.sales_overview?.refunds || 0}
              </h4>
              <p className="text-sm mt-2 text-red-500 font-medium">
                ↓ {dashboardData.sales_overview?.growth_refunds || 0}%{" "}
                <span className="text-gray-500 font-normal">vs last month</span>
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[280px]">
            {dashboardData.sales_overview?.chart_data?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dashboardData.sales_overview.chart_data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 13, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tick={{ fontSize: 13, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />

                  <Tooltip
                    formatter={(value) => [`₹${value}`, "Revenue"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#salesGradient)"
                    dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No sales data found
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Top Sold Products</h2>

          <div className="space-y-4">
            {dashboardData.top_products && dashboardData.top_products.length > 0 ? (
              dashboardData.top_products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-3 last:border-b-0"
                >
                  {/* Left side */}
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                    <p className="text-lg text-gray-800 font-semibold">{product.name}</p>
                  </div>

                  {/* Right side */}
                  <p className="text-lg text-gray-500 font-medium">
                    {product.sold} sold
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No top sold products found</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-[#dddddd] overflow-hidden">
        <div className="p-6 border-b border-[#dddddd]">
          <h3 className="text-lg font-bold">
            Recent Orders
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">
                  Order ID
                </th>
                <th className="text-left p-4">
                  Customer
                </th>
                <th className="text-left p-4">
                  Product
                </th>
                <th className="text-left p-4">
                  Amount
                </th>
                <th className="text-left p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.recent_orders?.length > 0 ? (
                dashboardData.recent_orders.map((order) => (
                  <tr key={order.order_id} className="border-t border-[#dddddd]">
                    <td className="p-4">#{order.order_id}</td>
                    <td className="p-4">{order.username}</td>
                    <td className="p-4">{order.products || "No Product"}</td>
                    <td className="p-4">₹{order.total_amount}</td>
                    <td className="p-4">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No recent orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default DashboardPage;