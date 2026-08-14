import { Pencil, Trash2 } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import AddProductsModal from "./AddProductsModal";
import { deleteProduct } from "../../api/products";
import ProductPagination from "./ProductPagination";
import { useEffect } from "react";

export default function Product() {
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("")
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);
    const {
        products,
        loading,
        fetchProducts,
        handleAddProduct,
        handleUpdateProduct,
    } = useProducts();

    if (loading) {
        return <p>Loading...</p>;
    }
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async () => {
        try {
            await deleteProduct(selectedProductId);

            await fetchProducts();

            setShowDeleteModal(false);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen rounded-lg">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
                <h1 className="text-2xl md:text-4xl font-bold">
                    Products
                </h1>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
                    <select className="px-4 py-2 border rounded-xl bg-white w-full sm:w-auto">
                        <option>All Status</option>
                    </select>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search product..."
                        className="px-4 py-2 border rounded-xl w-full sm:w-72"
                    />

                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setShowForm(true);
                        }}
                        className="bg-[#FFA100] text-white px-5 py-2 rounded-lg  font-medium w-full sm:w-auto">
                        Add Product
                    </button>
                </div>
            </div>

            {/* Add / Update Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
                    <div className="bg-white p-4 md:p-6 rounded-xl w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto">
                        <AddProductsModal
                            product={editingProduct}
                            handleAddProduct={handleAddProduct}
                            handleUpdateProduct={handleUpdateProduct}
                            onClose={() => {
                                setShowForm(false);
                                setEditingProduct(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-3xl border overflow-x-auto">
                <table className="min-w-[1100px] w-full">
                    <thead>
                        <tr className="border-b bg-white">
                            <th className="text-left px-8 py-6">
                                ID
                            </th>
                            <th className="text-left px-8 py-6">
                                Image
                            </th>
                            <th className="text-left px-8 py-6">
                                Product Name
                            </th>
                            {/* <th className="text-left px-8 py-6">
                                Description
                            </th> */}
                            <th className="text-left px-8 py-6">
                                Material
                            </th>
                            <th className="text-left px-8 py-6">
                                Section
                            </th>
                            <th className="text-left px-8 py-6">
                                Category
                            </th>
                            <th className="text-left px-8 py-6">
                                Size
                            </th>

                            <th className="text-left px-8 py-6">
                                Gender
                            </th>
                            <th className="text-left px-8 py-6">
                                Price
                            </th>
                            <th className="text-left px-8 py-6">
                                Stock
                            </th>
                            <th className="text-left px-8 py-6">
                                Status
                            </th>
                            <th className="text-left px-8 py-6">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedProducts.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b"
                            >
                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    {product.id}
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    <img
                                        src={
                                            product.image ||
                                            "https://via.placeholder.com/70"
                                        }
                                        alt={product.name}
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
                                    />
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6 font-medium">
                                    {product.name}
                                </td>

                                {/* <td className="px-8 py-8">
                                    {product.description}
                                </td> */}

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    {product.material}
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    {product.sections}
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    {product.category?.name}
                                </td>
                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    {product.size}
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    {product.gender}
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    ₹{product.price}
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    {product.stock}
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full ${product.stock > 0
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.stock > 0
                                            ? "Active"
                                            : "Out of Stock"}
                                    </span>
                                </td>

                                <td className="px-4 md:px-8 py-4 md:py-6">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingProduct(
                                                    product
                                                );
                                                setShowForm(true);
                                            }}
                                            className="w-9 h-9 md:w-11 md:h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedProductId(product.id);
                                                setShowDeleteModal(true);
                                            }}
                                            className="w-9 h-9 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"
                                        >
                                            <Trash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
                        <div className="bg-white p-6 rounded-xl w-96">
                            <h3 className="text-lg font-semibold">
                                Delete Product
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Do you want to delete this product?
                            </p>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showSuccess && (
                    <div className="fixed bottom-6 right-6 bg-yellow-600 text-white px-4 py-3 rounded-lg shadow-lg">
                        Product deleted successfully.
                    </div>
                )}
            </div>
            <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                totalItems={filteredProducts.length}
            />
        </div>
    );
}