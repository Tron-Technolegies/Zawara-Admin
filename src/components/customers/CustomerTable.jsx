import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { deleteCustomer } from "../../api/customers";

function CustomerTable({ customers }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteCustomer(selectedCustomer.id);

      setShowConfirm(false);
      setSelectedCustomer(null);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error("Delete customer error:", error);
    }
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
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
                    <div className="w-12 h-12 rounded-full bg-[#FFA100] text-white flex items-center justify-center font-semibold">
                      {customer.full_name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium">
                        {customer.full_name}
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
                  {customer.mobile}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${customer.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {customer.is_active
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowConfirm(true);
                      }}
                      className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold">
              Delete Customer
            </h3>

            <p className="mt-3 text-gray-600">
              Are you sure you want to delete this customer?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedCustomer(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-[70]">
          Customer deleted successfully.
        </div>
      )}

    </div>
  );
}

export default CustomerTable;