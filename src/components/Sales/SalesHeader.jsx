import { useState } from "react";

function SalesHeader({
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
}) {
    return (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

            <h1 className="text-2xl md:text-4xl font-bold">
                Sales History
            </h1>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full sm:w-auto"
                >
                    <option value="All">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                </select>

                <input
                    type="text"
                    placeholder="Search sales..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full sm:w-64"
                />

            </div>

        </div>
    );
}

export default SalesHeader;