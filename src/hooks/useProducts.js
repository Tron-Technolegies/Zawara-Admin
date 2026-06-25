import { useEffect, useState } from "react";
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../api/products";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (formData) => {
        try {
            const res = await addProduct(formData);

            setProducts((prev) => [
                ...prev,
                res.data,
            ]);

            return res.data;
        } catch (error) {
            console.error("Add failed:", error);
            throw error;
        }
    };
    const handleUpdateProduct = async (id, formData) => {
        try {
            await updateProduct(id, formData);
            await fetchProducts();
        } catch (error) {
            console.error("Update failed:", error);
            throw error;
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        fetchProducts,
        handleAddProduct,
        handleUpdateProduct,
    };

}