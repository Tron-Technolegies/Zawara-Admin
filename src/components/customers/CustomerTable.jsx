import {
  FiTrash2,
} from "react-icons/fi";

function CustomerTable({
  customers,

}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Email
              </th>

              <th className="px-6 py-4 text-left">
                Phone
              </th>

              <th className="px-6 py-4 text-left">
                Orders
              </th>

              <th className="px-6 py-4 text-left">
                Total Spent
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-[#FFA100] flex items-center justify-center font-semibold">
                      {customer.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium">
                        {customer.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        ID #{customer.id}
                      </p>
                    </div>

                  </div>

                </td>

                <td className="px-6 py-4">
                  {customer.email}
                </td>

                <td className="px-6 py-4">
                  {customer.phone}
                </td>

                <td className="px-6 py-4">
                  {customer.orders}
                </td>

                <td className="px-6 py-4 text-green-600 font-semibold">
                  ₹{customer.totalSpent}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                      <FiTrash2 />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerTable;