import { useEffect, useState } from "react";
import {
    getAdminOrders,
    updateAdminOrderStatus,
    updateAdminTrackingLink,
    updateAdminTrackingNumber,
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

    const updateTrackingLink = async (orderId, trackingLink) => {
        try {
            await updateAdminTrackingLink(orderId, trackingLink);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, trackingLink: trackingLink }
                        : order
                )
            );
        } catch (err) {
            console.error("Failed to update tracking link:", err);
            setError("Failed to update tracking link");
            throw err;
        }
    };

    const updateTrackingNumber = async (orderId, trackingNumber) => {
        try {
            await updateAdminTrackingNumber(orderId, trackingNumber);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, trackingNumber: trackingNumber }
                        : order
                )
            );
        } catch (err) {
            console.error("Failed to update tracking number:", err);
            setError("Failed to update tracking number");
            throw err;
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
        updateTrackingLink,
        updateTrackingNumber,
    };
}

export default useAdminOrders;