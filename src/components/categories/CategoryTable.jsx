
import {
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useCategories } from "../../hooks/useCategory"
import { deleteCategories } from "../../api/categories";
import { useState } from "react";
import UpdateCategoryModal from "./UpdateCategoryModal";

function CategoryTable({ categories }) {
  const { fetchCategories } = useCategories();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteCategories(selectedCategoryId);

      setShowDeleteModal(false);

      await fetchCategories();

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-6 py-4 text-left">
                ID
              </th>
              <th className="px-6 py-4 text-left">
                Image
              </th>
              <th className="px-6 py-4 text-left">
                Category Name
              </th>
              <th className="px-6 py-4 text-left">
                Description
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

            {categories?.map((category) => (
              <tr
                key={category.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {category.id}
                </td>
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

                <td className="px-6 py-4 font-medium">
                  {category.description}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${category.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {category.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowUpdateModal(true);
                      }}
                      className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        setShowDeleteModal(true);
                      }}
                      className="w-9 h-9 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"
                    >
                      <FiTrash2 />
                    </button>

                  </div>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
        {showUpdateModal && (
          <UpdateCategoryModal
            category={selectedCategory}
            onClose={() =>
              setShowUpdateModal(false)
            } />
        )}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96">
              <h3 className="text-lg font-semibold">
                Delete Category
              </h3>

              <p className="mt-2 text-gray-600">
                Do you want to delete this category?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-yellow-600 text-white px-4 py-3 rounded-lg shadow-lg">
            Category deleted successfully.
          </div>
        )}
      </div>

    </div>
  );
}

export default CategoryTable;