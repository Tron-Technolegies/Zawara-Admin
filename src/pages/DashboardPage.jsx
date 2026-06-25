import {
  FiBox,
  FiGrid,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import api from "../api/api";

function DashboardPage() {
  // const [period, setPeriod] = useState("week")
  const [dashboardData, setDashboardData] = useState({
    total_products: 0,
    total_categories: 0,
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
      {/* Header & Filter */}
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"> */}

      {/* <div className="flex items-center gap-2"> */}
      {/* <button
            onClick={() => setPeriod("thisWeek")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${period === "thisWeek"
              ? "bg-[#FFA100] text-black"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
            This Week
          </button> */}

      {/* <button
            onClick={() => setPeriod("thisMonth")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${period === "thisMonth"
              ? "bg-[#FFA100] text-black"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
            This Month
          </button>

          <button
            onClick={() => setPeriod("thisYear")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${period === "thisYear"
              ? "bg-[#FFA100] text-black"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
            This Year
          </button> */}
      {/* </div> */}
      {/* // </div> */}

      {/* Stats */}
      {/* Stats */}
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
                {dashboardData.total_categories}
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

        {/* Sales */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#dddddd]">
          <h3 className="text-lg font-semibold mb-4">
            Sales Overview
          </h3>

          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Chart Area
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl border border-[#dddddd]">
          <h3 className="text-lg font-semibold mb-4">
            Top Products
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Silk Bridal Lehenga</span>
              <span>145 Sold</span>
            </div>

            <div className="flex justify-between">
              <span>Designer Saree</span>
              <span>120 Sold</span>
            </div>

            <div className="flex justify-between">
              <span>Festive Kurti</span>
              <span>95 Sold</span>
            </div>

            <div className="flex justify-between">
              <span>Wedding Gown</span>
              <span>80 Sold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-[#dddddd] overflow-hidden">
        <div className="p-6 border-b border-[#dddddd]">
          <h3 className="text-lg font-semibold">
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
              <tr className="border-t border-[#dddddd]">
                <td className="p-4">#ZW001</td>
                <td className="p-4">Ananya</td>
                <td className="p-4">
                  Bridal Lehenga
                </td>
                <td className="p-4">₹24,500</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Delivered
                  </span>
                </td>
              </tr>

              <tr className="border-t border-[#dddddd]">
                <td className="p-4">#ZW002</td>
                <td className="p-4">Riya</td>
                <td className="p-4">
                  Designer Saree
                </td>
                <td className="p-4">₹12,000</td>
                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="border-t border-[#dddddd]">
                <td className="p-4">#ZW003</td>
                <td className="p-4">Meera</td>
                <td className="p-4">
                  Festive Kurti
                </td>
                <td className="p-4">₹4,500</td>
                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    Shipped
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default DashboardPage;