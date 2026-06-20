import { FiFilter, FiSearch } from "react-icons/fi";

function CustomerHeader({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">

      <h1 className="text-3xl font-bold">
        Customers
      </h1>

      <div className="flex flex-wrap gap-3 w-full lg:w-auto">

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border rounded-lg px-4 py-3"
        >
          <option value="All">
            All Status
          </option>
          <option value="Active">
            Active
          </option>
          <option value="Inactive">
            Inactive
          </option>
        </select>

        <div className="relative">

          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search customer..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="pl-11 pr-4 py-3 border rounded-lg w-full lg:w-80"
          />

        </div>

        <button className="border border-blue-500 text-blue-600 px-5 py-3 rounded-lg flex items-center gap-2">
          <FiFilter />
          Filters
        </button>

      </div>

    </div>
  );
}

export default CustomerHeader;