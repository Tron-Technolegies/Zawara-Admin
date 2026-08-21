import React, { useMemo, useState } from "react";
import { Search, Link } from "lucide-react";
import useAdminOrders from "../hooks/useAdminOrders";

function OrdersPage() {
  const {
    orders,
    loading,
    error,
    updateOrderStatus,
  } = useAdminOrders();
  const buttons = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Completed",
    "Cancelled"
  ];

  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // search filter
    if (search.trim()) {
      filtered = filtered.filter((order) =>
        order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        order.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
        order.orderNumber?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // status filter
    if (active !== "All") {
      filtered = filtered.filter(
        (order) => order.orderStatus?.toLowerCase() === active.toLowerCase()
      );
    }

    return filtered;
  }, [orders, search, active]);

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();

    if (s === "pending") return "bg-yellow-500 text-white";
    if (s === "processing") return "bg-blue-500 text-white";
    if (s === "shipped") return "bg-indigo-500 text-white";
    if (s === "completed") return "bg-green-600 text-white";
    if (s === "cancelled") return "bg-red-500 text-white";

    return "bg-gray-400 text-white";
  };

  const getItemsText = (products = []) => {
    const totalQty = products.reduce((sum, item) => sum + (item.qty || 0), 0);
    return `${products.length} product(s) / ${totalQty} item(s)`;
  };

  if (loading) {
    return <div className="p-6 text-lg">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="h-full">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Orders</h1>

        <div className="flex justify-between items-center py-9 flex-wrap gap-4">

          {/* Status Buttons */}

          <div className="flex gap-3 flex-wrap">
            {buttons.map((btn) => (
              <button
                key={btn}
                type="button"
                onClick={() => setActive(btn)}
                className={`px-4 py-2 rounded-full transition text-sm font-semibold ${active === btn
                  ? "bg-blue-700 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Search + Clear */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                placeholder="Search by User, Order ID, or Email..."
                className="bg-white rounded-lg border border-gray-300 pl-10 pr-4 py-2 hover:border-yellow-500 focus:outline-none w-80"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                setSearch("");
                setActive("All");
              }}
              className="text-gray-500 border border-gray-300 py-2 px-4 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="text-black bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">Order ID</th>
                  <th className="px-6 py-4 text-left">User / Details</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Total</th>
                  <th className="px-6 py-4 text-left">Items</th>
                  <th className="px-6 py-4 text-center">Tracking Link</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50 align-top">
                      {/* Order ID */}
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {order.orderNumber}
                      </td>

                      {/* User / Details */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">
                          {order.customerName || "Guest"}
                        </p>
                        <p className="text-sm text-gray-500 pt-1">{order.customerEmail || "-"}</p>
                        <p className="text-sm text-gray-500 pt-1">{order.phone || "-"}</p>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {order.orderDate}
                      </td>

                      {/* Total */}
                      <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                        {order.totalAmount}
                      </td>

                      {/* Items */}
                      <td className="px-6 py-4">
                        <div className="mt-2 space-y-1">
                          {(order.products || []).map((product, index) => (
                            <div key={index} className="text-sm text-gray-500">
                              {product.name} × {product.qty}
                              {product.size ? ` (${product.size})` : ""}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Tracking Link */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          {order.trackingLink ? (
                            <a
                              href={order.trackingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                            >
                              <Link size={16} />
                              Track
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">No link</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <select
                            value={order.orderStatus || "Pending"}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value)
                            }
                            className={`rounded-lg px-3 py-2 text-sm font-medium border-0 outline-none cursor-pointer ${getStatusBadge(
                              order.orderStatus
                            )}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;