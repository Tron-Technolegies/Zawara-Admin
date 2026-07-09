import { useEffect, useState } from "react";
import { getAdminOrders } from "../api/orders";

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

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        error,
        refetchOrders: fetchOrders,
    };
}

export default useAdminOrders;