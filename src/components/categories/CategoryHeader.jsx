import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

function CategoryHeader({
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold self-start">
        Categories
      </h1>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-auto"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-64"
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#FFA100] px-5 py-2 rounded-lg font-medium w-full sm:w-auto"
        >
          Add Category
        </button>

        {showModal && (
          <AddCategoryModal
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default CategoryHeader;