import React from "react";

function OrdersTable({
    filteredOrders,
    updateOrderStatus,
    updateTrackingLink,
    updateTrackingNumber,
}) {
    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();

        if (s === "pending") return "bg-yellow-500 text-white";
        if (s === "processing") return "bg-blue-500 text-white";
        if (s === "shipped") return "bg-indigo-500 text-white";
        if (s === "completed") return "bg-green-600 text-white";
        if (s === "cancelled") return "bg-red-500 text-white";

        return "bg-gray-400 text-white";
    };

    // --------------------------------------------------
    // TRACKING NUMBER
    // Save when admin finishes entering the number
    // --------------------------------------------------

    const handleTrackingNumberBlur = async (orderId, e) => {
        const trackingNumber = e.target.value.trim();

        try {
            await updateTrackingNumber(orderId, trackingNumber);
        } catch (error) {
            console.error(
                "Failed to update tracking number:",
                error
            );
        }
    };

    // --------------------------------------------------
    // TRACKING LINK
    // Auto-save when pasted
    // --------------------------------------------------

    const handleTrackingLinkPaste = async (orderId, e) => {
        const pastedText = e.clipboardData.getData("text").trim();

        if (!pastedText) return;

        try {
            await updateTrackingLink(orderId, pastedText);
        } catch (error) {
            console.error(
                "Failed to update tracking link:",
                error
            );
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-6">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1250px]">

                    <thead className="text-black bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left">
                                Order ID
                            </th>

                            <th className="px-6 py-4 text-left">
                                User / Details
                            </th>

                            <th className="px-6 py-4 text-left">
                                Address
                            </th>

                            <th className="px-6 py-4 text-left">
                                Order Date
                            </th>

                            <th className="px-6 py-4 text-left">
                                Shipping Date
                            </th>

                            <th className="px-6 py-4 text-left">
                                Total
                            </th>

                            <th className="px-6 py-4 text-left">
                                Items
                            </th>

                            <th className="px-6 py-4 text-center">
                                DTDC Tracking No.
                            </th>

                            <th className="px-6 py-4 text-center">
                                Tracking Link
                            </th>

                            <th className="px-6 py-4 text-center">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredOrders.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="10"
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    No orders found.
                                </td>
                            </tr>

                        ) : (

                            filteredOrders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="border-t hover:bg-gray-50 align-top"
                                >

                                    {/* Order ID */}
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                        {order.orderNumber}
                                    </td>


                                    {/* User / Details */}
                                    <td className="px-6 py-4">

                                        <p className="font-medium text-slate-800">
                                            {order.customerName || "Guest"}
                                        </p>

                                        <p className="text-sm text-gray-500 pt-1">
                                            {order.customerEmail || "-"}
                                        </p>

                                        <p className="text-sm text-gray-500 pt-1">
                                            {order.phone || "-"}
                                        </p>

                                    </td>


                                    {/* Address */}
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">

                                        {order.shippingAddress
                                            ?.split("\n")
                                            .map((line, index) => (

                                                <div
                                                    key={index}
                                                    className="mb-1"
                                                >
                                                    {line}
                                                </div>

                                            ))}

                                    </td>


                                    {/* Order Date */}
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {order.orderDate}
                                    </td>


                                    {/* Shipping Date */}
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {order.shippedDate || "-"}
                                    </td>


                                    {/* Total */}
                                    <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                                        {order.totalAmount}
                                    </td>


                                    {/* Items */}
                                    <td className="px-6 py-4">

                                        <div className="mt-2 space-y-1">

                                            {(order.products || []).map(
                                                (product, index) => (

                                                    <div
                                                        key={index}
                                                        className="text-sm text-gray-500"
                                                    >
                                                        {product.name} ×{" "}
                                                        {product.qty}

                                                        {product.size
                                                            ? ` (${product.size})`
                                                            : ""}
                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </td>


                                    {/* DTDC Tracking Number */}
                                    <td className="px-6 py-4">

                                        <div className="flex items-center justify-center">

                                            <input
                                                type="text"
                                                defaultValue={
                                                    order.trackingNumber || ""
                                                }
                                                placeholder="Enter DTDC No."
                                                onBlur={(e) =>
                                                    handleTrackingNumberBlur(
                                                        order.id,
                                                        e
                                                    )
                                                }
                                                className="w-44 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            />

                                        </div>

                                    </td>


                                    {/* Tracking Link */}
                                    <td className="px-6 py-4">

                                        <div className="flex items-center justify-center">

                                            <input
                                                type="url"
                                                defaultValue={
                                                    order.trackingLink || ""
                                                }
                                                placeholder="Paste tracking link"
                                                onPaste={(e) =>
                                                    handleTrackingLinkPaste(
                                                        order.id,
                                                        e
                                                    )
                                                }
                                                className="w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                            />

                                        </div>

                                    </td>


                                    {/* Status */}
                                    <td className="px-6 py-4">

                                        <div className="flex justify-center">

                                            <select
                                                value={
                                                    order.orderStatus ||
                                                    "Pending"
                                                }
                                                onChange={(e) =>
                                                    updateOrderStatus(
                                                        order.id,
                                                        e.target.value
                                                    )
                                                }
                                                className={`rounded-lg px-3 py-2 text-sm font-medium border-0 outline-none cursor-pointer ${getStatusBadge(
                                                    order.orderStatus
                                                )}`}
                                            >

                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Processing">
                                                    Processing
                                                </option>

                                                <option value="Shipped">
                                                    Shipped
                                                </option>

                                                <option value="Completed">
                                                    Completed
                                                </option>

                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>

                                            </select>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default OrdersTable;