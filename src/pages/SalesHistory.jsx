import React, { useMemo, useState } from "react";
import useSalesHistory from "../hooks/useSalesHistory";
import SalesHistoryTable from "../components/Sales/SalesHistoryTable"
import SaleHeader from "../components/Sales/SaleHeader";

const SalesHistory = () => {
    const {
        sales,
        count,
        loading,
        error,
    } = useSalesHistory();

    const [statusFilter, setStatusFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSales = useMemo(() => {
        return sales.filter((sale) => {
            const matchesStatus =
                statusFilter === "All" ||
                sale.paymentStatus === statusFilter;

            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                !search ||
                sale.orderNumber?.toLowerCase().includes(search) ||
                sale.customerName?.toLowerCase().includes(search) ||
                sale.customerEmail?.toLowerCase().includes(search) ||
                sale.phone?.toLowerCase().includes(search) ||
                sale.products?.some((product) =>
                    product.productName
                        ?.toLowerCase()
                        .includes(search)
                );

            return matchesStatus && matchesSearch;
        });
    }, [sales, statusFilter, searchTerm]);

    return (
        <div className="p-4 md:p-6">

            <SaleHeader
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Showing {filteredSales.length} of {count} sales
                </p>
            </div>

            <SalesHistoryTable
                sales={filteredSales}
                loading={loading}
                error={error}
            />

        </div>
    );
};

export default SalesHistory;