import { useEffect, useState } from "react";
import { getCustomers } from "../api/customers";

export const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            const res = await getCustomers();
            setCustomers(res.data);
        } catch (error) {
            console.error("Fetch customers error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return {
        customers,
        loading,
        fetchCustomers,
    };
};