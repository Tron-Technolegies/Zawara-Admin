import React from "react";
import { useState } from "react";
import { Search, Link } from "lucide-react";

function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [active, setActive] = useState("All");
  const buttons = ["All", "Pending", "Processing", "Shipped", "Completed", "Tracked"];
  const [search, setSearch] = useState("")
  const [orders, setOrders] = useState([]);

  const filteredOrders = orders.filter(
    (order) =>
      order.username?.toLowerCase().includes(search.toLowerCase()) ||
      order.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="h-full">
        <div>
          <h1 className="font-bold text-3xl">Orders</h1>

          <div className="flex justify-between items-center py-9 flex-wrap gap-4">

            {/* Status Buttons */}
            <div className="flex gap-3 flex-wrap">
              {buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => setActive(btn)}
                  className={`px-4 py-2 rounded-full transition text-sm ${active === btn
                    ? "bg-blue-700 font-semibold text-white"
                    : "bg-white font-semibold text-slate-700 hover:bg-slate-50"
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="search"
                  placeholder="Search by User, ID, or Email..."
                  className="bg-white rounded-lg border border-gray-300 pl-10 pr-4 py-2 hover:border-yellow-500 focus:outline-none w-80"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} />
              </div>

              <button className="text-gray-500 border border-gray-300 py-2 px-4 rounded-lg">
                Clear
              </button>
            </div>

          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="text-black">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Order ID
                    </th>

                    <th className="px-6 py-4 text-left">
                      User/Details
                    </th>

                    <th className="px-6 py-4 text-left">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left">
                      Items
                    </th>

                    <th className="px-6 py-4 text-center">
                      Tracking Link
                    </th>

                    <th className="px-6 py-4 text-center">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">
                      fghj
                    </td>

                    <td className="px-6 py-4 font-medium">
                      category.name
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      category.slug
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      category.slug
                    </td>

                    <td className="px-6 py-4">
                      kjjhb
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Link
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="url"
                            placeholder="Paste tracking URL..."
                            className="border border-gray-400 rounded-lg pl-10 pr-3 py-2 w-64 focus:outline-none" />
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 items-center">
                        <div className="bg-yellow-600 text-white rounded-lg px-3 py-1">
                          Pending
                        </div>

                        <div className="relative">
                          <select
                            className="appearance-none border border-gray-400 rounded-lg px-3 py-2 pr-8 focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            ▼
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default OrdersPage;