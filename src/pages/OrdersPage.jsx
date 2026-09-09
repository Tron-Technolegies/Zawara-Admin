import React, { useMemo, useState } from "react";
import useAdminOrders from "../hooks/useAdminOrders";

import OrdersHeader from "../components/Orders/OrdersHeader"
import OrdersTable from "../components/Orders/OrdersTable"

function OrdersPage() {
  const {
    orders,
    loading,
    error,
    updateOrderStatus,
    updateTrackingLink,
    updateTrackingNumber
  } = useAdminOrders();

  const buttons = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Completed",
    "Cancelled",
  ];

  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // search filter
    if (search.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.customerName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          order.customerEmail
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          order.orderNumber
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    // status filter
    if (active !== "All") {
      filtered = filtered.filter(
        (order) =>
          order.orderStatus?.toLowerCase() === active.toLowerCase()
      );
    }

    return filtered;
  }, [orders, search, active]);

  if (loading) {
    return <div className="p-6 text-lg">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="h-full">
      <div>

        {/* Header */}
        <OrdersHeader
          active={active}
          setActive={setActive}
          search={search}
          setSearch={setSearch}
          buttons={buttons}
        />

        {/* Table */}
        <OrdersTable
          filteredOrders={filteredOrders}
          updateOrderStatus={updateOrderStatus}
          updateTrackingLink={updateTrackingLink}
          updateTrackingNumber={updateTrackingNumber}
        />

      </div>
    </div>
  );
}

export default OrdersPage;