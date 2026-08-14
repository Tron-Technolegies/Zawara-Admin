import React from "react";

const SalesHistoryTable = ({
    sales = [],
    loading = false,
    error = null,
}) => {
    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-8 text-center">
                    <p className="text-gray-500">
                        Loading sales history...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl border border-red-200 overflow-hidden">
                <div className="p-8 text-center">
                    <p className="text-red-600 font-medium">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!sales.length) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-8 text-center">
                    <p className="text-gray-500">
                        No sales found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] lg:min-w-[1100px]">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-4 lg:px-6 py-4 text-left whitespace-nowrap">
                                Order
                            </th>

                            <th className="px-4 lg:px-6 py-4 text-left whitespace-nowrap">
                                Customer
                            </th>

                            <th className="px-4 lg:px-6 py-4 text-left whitespace-nowrap">
                                Products
                            </th>

                            <th className="px-4 lg:px-6 py-4 text-left whitespace-nowrap">
                                Amount
                            </th>

                            <th className="px-4 lg:px-6 py-4 text-left whitespace-nowrap">
                                Payment
                            </th>

                            <th className="px-4 lg:px-6 py-4 text-left whitespace-nowrap">
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {sales.map((sale) => (

                            <tr
                                key={sale.saleId}
                                className="border-t hover:bg-gray-50"
                            >

                                {/* Order */}

                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">

                                    <div className="font-semibold text-gray-900">
                                        {sale.orderNumber}
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        Sale ID: {sale.saleId}
                                    </div>

                                </td>


                                {/* Customer */}

                                <td className="px-4 lg:px-6 py-4">

                                    <div className="font-medium text-gray-900 whitespace-nowrap">
                                        {sale.customerName || "Guest"}
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">
                                        {sale.customerEmail || "-"}
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        {sale.phone || "-"}
                                    </div>

                                </td>


                                {/* Products */}

                                <td className="px-4 lg:px-6 py-4">

                                    <div className="space-y-2">

                                        {sale.products?.map((product, index) => (

                                            <div
                                                key={`${sale.saleId}-${product.productId}-${index}`}
                                                className="min-w-[220px]"
                                            >

                                                <div className="font-medium text-gray-900">
                                                    {product.productName}
                                                </div>

                                                <div className="text-xs text-gray-500 mt-1">

                                                    Qty: {product.quantity}

                                                    {" • "}

                                                    ₹{product.unitPrice}

                                                </div>


                                                {(product.size || product.material) && (

                                                    <div className="text-xs text-gray-400 mt-1">

                                                        {product.size &&
                                                            `Size: ${product.size}`}

                                                        {product.size &&
                                                            product.material &&
                                                            " • "}

                                                        {product.material &&
                                                            `Material: ${product.material}`}

                                                    </div>

                                                )}

                                            </div>

                                        ))}

                                    </div>

                                </td>


                                {/* Amount */}

                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">

                                    <span className="font-semibold text-gray-900">
                                        ₹{sale.totalAmount}
                                    </span>

                                </td>


                                {/* Payment */}

                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${sale.paymentStatus === "paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {sale.paymentStatus}
                                    </span>

                                </td>


                                {/* Date */}

                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">

                                    <div className="text-gray-700">
                                        {sale.orderDate}
                                    </div>

                                    {sale.orderDateTime && (

                                        <div className="text-xs text-gray-400 mt-1">

                                            {new Date(
                                                sale.orderDateTime
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}

                                        </div>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default SalesHistoryTable;