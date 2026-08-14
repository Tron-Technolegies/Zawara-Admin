import { useCallback, useEffect, useState } from "react";
import { getSalesHistory } from "../api/salesHistory";

const useSalesHistory = () => {
    const [sales, setSales] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSalesHistory = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getSalesHistory();

            console.log("Sales History Response:", response.data);

            if (response.data?.success) {
                setSales(response.data.sales || []);
                setCount(response.data.count || 0);
            } else {
                setSales([]);
                setCount(0);
                setError(
                    response.data?.error ||
                    "Failed to fetch sales history"
                );
            }
        } catch (error) {
            console.error("Sales history error:", error);

            setSales([]);
            setCount(0);

            setError(
                error?.response?.data?.error ||
                error?.message ||
                "Failed to fetch sales history"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSalesHistory();
    }, [fetchSalesHistory]);

    return {
        sales,
        count,
        loading,
        error,
        fetchSalesHistory,
    };
};

export default useSalesHistory;