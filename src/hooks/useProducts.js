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

    const handleAddProduct = async (productData) => {
        try {
            const res = await addProduct(productData);

            const newProduct = res.data;

            setProducts((prev) => [
                ...prev,
                newProduct,
            ]);

            return newProduct;
        } catch (error) {
            console.error("Add failed:", error);
            throw error;
        }
    };

    const handleUpdateProduct = async (id, updatedData) => {
        try {
            await updateProduct(id, updatedData);
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