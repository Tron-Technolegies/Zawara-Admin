    import {
    FiEdit2,
    FiTrash2,
    } from "react-icons/fi";
    import { useState } from "react";
    import AddProductModal from "./AddProductModal";

    function Products() {
    const products = [
        {
        id: 1,
        image: "https://via.placeholder.com/60",
        name: "Silk Bridal Lehenga",
        category: "Lehenga",
        price: "₹24,500",
        stock: 15,
        status: "Active",
        },
        {
        id: 2,
        image: "https://via.placeholder.com/60",
        name: "Designer Saree",
        category: "Saree",
        price: "₹12,000",
        stock: 8,
        status: "Active",
        },
        {
        id: 3,
        image: "https://via.placeholder.com/60",
        name: "Festive Kurti",
        category: "Kurti",
        price: "₹4,500",
        stock: 0,
        status: "Out of Stock",
        },
        {
        id: 4,
        image: "https://via.placeholder.com/60",
        name: "Wedding Gown",
        category: "Gown",
        price: "₹18,900",
        stock: 5,
        status: "Active",
        },
    ];
    const [showModal, setShowModal] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [searchTerm, setSearchTerm] = useState("");

const productsPerPage = 5;

const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);

const indexOfLastProduct =
  currentPage * productsPerPage;

const indexOfFirstProduct =
  indexOfLastProduct - productsPerPage;

const currentProducts = filteredProducts.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);
    
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
            Products
            </h2>

            <button
            onClick={()=>setShowModal(true)}
            className="bg-[#FFA100] hover:bg-[#e69200] transition px-4 py-2 rounded-lg text-sm font-medium">
            Add Product
            </button>
            {showModal &&(
                <AddProductModal
                onClose={() => setShowModal(false)}
                />
            )}
        </div>
        <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">

  <h2 className="text-2xl font-bold text-gray-900">
    Products
  </h2>

  <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">

    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="w-full sm:w-72 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA100]"
    />

    <button
      className="bg-[#FFA100] text-black px-5 py-2 rounded-lg font-medium hover:bg-[#e69200] transition"
    >
      Search
    </button>

    <button
      onClick={() => setSearchTerm("")}
      className="text-gray-600 hover:text-black transition"
    >
      Clear
    </button>

  </div>
</div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Product
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Stock
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                </th>
                </tr>
            </thead>

            <tbody>
                {currentProducts.map((product) => (
                <tr
                    key={product.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                    {/* Product */}
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                        <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover border"
                        />

                        <div>
                        <p className="font-medium text-gray-900">
                            {product.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            ID #{product.id}
                        </p>
                        </div>
                    </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-gray-700">
                    {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                    {product.price}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">
                    <span
                        className={`font-medium ${
                        product.stock > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                    >
                        {product.stock}
                    </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {product.status}
                    </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                        <button className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center">
                        <FiEdit2 />
                        </button>

                        <button className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center">
                        <FiTrash2 />
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
    <p className="text-sm text-gray-500">
        Showing {indexOfFirstProduct + 1} -
        {Math.min(indexOfLastProduct, filteredProducts.length)}
        {" "}of {filteredProducts.length} products
    </p>

    <div className="flex items-center gap-2">
    {/* Previous */}
    <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-40"
    >
        ‹
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;

        const showPage =
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 1 &&
            page <= currentPage + 1);

        if (!showPage) {
        if (
            page === currentPage - 2 ||
            page === currentPage + 2
        ) {
            return (
            <span
                key={page}
                className="px-2 text-gray-400"
            >
                ...
            </span>
            );
        }
        return null;
        }

        return (
        <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-full text-sm font-medium transition ${
            currentPage === page
                ? "bg-[#FFA100] text-black"
                : "hover:bg-gray-100"
            }`}
        >
            {page}
        </button>
        );
    })}

    {/* Next */}
    <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-40"
    >
        ›
    </button>
    </div>
    </div>
        </div>
    );
    }

    export default Products;