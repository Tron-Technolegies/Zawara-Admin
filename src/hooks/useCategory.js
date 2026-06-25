import { useEffect, useState } from "react";
import { getCategories, addCategories, updateCategories } from "../api/categories";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const res = await getCategories();
            setCategories(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (formData) => {
        try {
            const res = await addCategories(formData);

            // Option 1: re-fetch everything (safest)
            await fetchCategories();

            // Option 2 (faster UI update):
            // setCategories((prev) => [...prev, res.data]);

            return res.data;
        } catch (error) {
            console.error("Add category error:", error);
            throw error;
        }
    };
    const updateCategory = async (id, formData) => {
        try {
            const res = await updateCategories(
                id,
                formData
            );

            await fetchCategories();

            return res.data;
        } catch (error) {
            console.error(
                "Update category error:",
                error
            );
            throw error;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        fetchCategories,
        createCategory,
        updateCategory,
    };
};