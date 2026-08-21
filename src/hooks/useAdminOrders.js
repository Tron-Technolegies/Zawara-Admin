import { useEffect, useState } from "react";
import {
    getAdminOrders,
    updateAdminOrderStatus,
} from "../api/orders";

function useAdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAdminOrders();
            setOrders(response.data.orders || []);
        } catch (err) {
            console.error("Failed to fetch admin orders:", err);
            setError("Failed to load orders");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateAdminOrderStatus(orderId, newStatus);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, orderStatus: newStatus }
                        : order
                )
            );
        } catch (err) {
            console.error("Failed to update order status:", err);
            setError("Failed to update order status");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        error,
        refetchOrders: fetchOrders,
        updateOrderStatus,
    };
}

export default useAdminOrders;