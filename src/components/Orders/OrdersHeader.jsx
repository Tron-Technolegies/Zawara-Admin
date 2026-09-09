import React from "react";
import { Search } from "lucide-react";

function OrdersHeader({
    active,
    setActive,
    search,
    setSearch,
    buttons,
}) {
    return (
        <>
            <h1 className="text-2xl md:text-4xl font-bold">Orders</h1>

            <div className="flex justify-between items-center py-9 flex-wrap gap-4">

                {/* Status Buttons */}
                <div className="flex gap-3 flex-wrap">
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            type="button"
                            onClick={() => setActive(btn)}
                            className={`px-4 py-2 rounded-full transition text-sm font-semibold ${active === btn
                                    ? "bg-blue-700 text-white"
                                    : "bg-white text-slate-700 hover:bg-slate-50"
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
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="search"
                            placeholder="Search by User, Order ID, or Email..."
                            className="bg-white rounded-lg border border-gray-300 pl-10 pr-4 py-2 hover:border-yellow-500 focus:outline-none w-80"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setSearch("");
                            setActive("All");
                        }}
                        className="text-gray-500 border border-gray-300 py-2 px-4 rounded-lg"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </>
    );
}

export default OrdersHeader;