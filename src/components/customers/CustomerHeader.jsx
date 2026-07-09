import { FiFilter, FiSearch } from "react-icons/fi";

function CustomerHeader({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

      <h1 className="text-2xl md:text-4xl font-bold">
        Customers
      </h1>

      <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border rounded-lg px-4 py-3 w-full lg:w-44 min-w-[170px]"
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

        <div className="relative w-full lg:w-80">

          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search customer..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="pl-11 pr-4 py-3 border rounded-lg w-full"
          />

        </div>

        {/* <button className="border border-blue-500 text-blue-600 px-5 py-3 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto">
          <FiFilter />
          Filters
        </button> */}

      </div>

    </div>
  );
}

export default CustomerHeader;