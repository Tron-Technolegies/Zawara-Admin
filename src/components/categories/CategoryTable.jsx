
import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

function CategoryTable({ categories=[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-6 py-4 text-left">
                Image
              </th>

              <th className="px-6 py-4 text-left">
                Category Name
              </th>

              <th className="px-6 py-4 text-left">
                Slug
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Created Date
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {categories?.map((category) => (
              <tr
                key={category.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {category.name}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {category.slug}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      category.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {category.createdDate}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">

                    <button className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <FiEdit2 />
                    </button>

                    <button className="w-9 h-9 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
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

export default CategoryTable;