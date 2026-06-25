// import {
//     FiEdit2,
//     FiTrash2,
// } from "react-icons/fi";
// import { useState } from "react";
// import AddProductModal from "./AddProductModal";
// import { useProducts } from "../../hooks/useProducts";
// import { useCategories } from "../../hooks/useCategory";

// function Products() {
//     const { categories } = useCategories();
//     const {
//         products,
//         loading,
//         fetchProducts,
//         handleUpdateProduct,
//         handleDeleteProduct,
//     } = useProducts();

//     const [showModal, setShowModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [deleteId, setDeleteId] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [editProduct, setEditProduct] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [editError, setEditError] = useState("");
//     const [deleteError, setDeleteError] = useState("");

//     const filteredProducts = products.filter((product) =>
//         (product?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const productsPerPage = 10;
//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//     const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

//             {/* Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                     Products
//                 </h2>

//                 <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-[#FFA100] hover:bg-[#e69200] transition px-4 py-2 rounded-lg text-sm font-medium"
//                 >
//                     Add Product
//                 </button>

//                 {/* Pass fetchProducts so the list refreshes after add */}
//                 {showModal && (
//                     <AddProductModal
//                         onClose={() => setShowModal(false)}
//                         categories={categories}
//                         onSuccess={() => {
//                             fetchProducts();
//                             setShowModal(false);
//                         }}
//                     />
//                 )}
//             </div>

//             {/* Search Bar */}
//             <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
//                 <h2 className="text-2xl font-bold text-gray-900">
//                     Products
//                 </h2>

//                 <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
//                     <input
//                         type="text"
//                         placeholder="Search products..."
//                         value={searchTerm}
//                         onChange={(e) => {
//                             setSearchTerm(e.target.value);
//                             setCurrentPage(1); // reset to page 1 on search
//                         }}
//                         className="w-full sm:w-72 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFA100]"
//                     />

//                     <button
//                         className="bg-[#FFA100] text-black px-5 py-2 rounded-lg font-medium hover:bg-[#e69200] transition"
//                     >
//                         Search
//                     </button>

//                     <button
//                         onClick={() => {
//                             setSearchTerm("");
//                             setCurrentPage(1);
//                         }}
//                         className="text-gray-600 hover:text-black transition"
//                     >
//                         Clear
//                     </button>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="w-full min-w-[900px]">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Image</th>
//                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
//                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
//                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
//                             <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Stock</th>
//                             <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {currentProducts.length === 0 ? (
//                             <tr>
//                                 <td colSpan={6} className="text-center py-10 text-gray-400">
//                                     No products found.
//                                 </td>
//                             </tr>
//                         ) : (
//                             currentProducts.map((product) => (
//                                 <tr
//                                     key={product.id}
//                                     className="border-t border-gray-100 hover:bg-gray-50 transition"
//                                 >
//                                     <td className="px-6 py-4">
//                                         <img
//                                             src={product.image}
//                                             alt={product.name}
//                                             className="w-14 h-14 rounded-lg object-cover border"
//                                         />
//                                     </td>

//                                     <td className="px-6 py-4">
//                                         <p className="font-medium text-gray-900">{product.name}</p>
//                                         <p className="text-sm text-gray-500">ID #{product.id}</p>
//                                     </td>

//                                     <td className="px-6 py-4 text-gray-700">
//                                         {product.category?.name}
//                                     </td>

//                                     <td className="px-6 py-4 font-medium text-gray-900">
//                                         {product.price}
//                                     </td>

//                                     <td className="px-6 py-4">
//                                         <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
//                                             {product.stock}
//                                         </span>
//                                     </td>

//                                     <td className="px-6 py-4">
//                                         <div className="flex justify-center gap-3">
//                                             <button
//                                                 onClick={() => {
//                                                     setEditProduct(product);
//                                                     setEditError("");
//                                                     setShowEditModal(true);
//                                                 }}
//                                                 className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center"
//                                             >
//                                                 <FiEdit2 />
//                                             </button>

//                                             <button
//                                                 onClick={() => {
//                                                     setDeleteId(product.id);
//                                                     setDeleteError("");
//                                                     setShowDeleteModal(true);
//                                                 }}
//                                                 className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center"
//                                             >
//                                                 <FiTrash2 />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination Footer */}
//             <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
//                 <p className="text-sm text-gray-500">
//                     Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
//                 </p>

//                 <div className="flex items-center gap-2">
//                     <button
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage(currentPage - 1)}
//                         className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-40"
//                     >
//                         ‹
//                     </button>

//                     {[...Array(totalPages)].map((_, index) => {
//                         const page = index + 1;
//                         const showPage =
//                             page === 1 ||
//                             page === totalPages ||
//                             (page >= currentPage - 1 && page <= currentPage + 1);

//                         if (!showPage) {
//                             if (page === currentPage - 2 || page === currentPage + 2) {
//                                 return <span key={page} className="px-2 text-gray-400">...</span>;
//                             }
//                             return null;
//                         }

//                         return (
//                             <button
//                                 key={page}
//                                 onClick={() => setCurrentPage(page)}
//                                 className={`w-10 h-10 rounded-full text-sm font-medium transition ${currentPage === page ? "bg-[#FFA100] text-black" : "hover:bg-gray-100"
//                                     }`}
//                             >
//                                 {page}
//                             </button>
//                         );
//                     })}

//                     <button
//                         disabled={currentPage >= totalPages}
//                         onClick={() => setCurrentPage(currentPage + 1)}
//                         className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 disabled:opacity-40"
//                     >
//                         ›
//                     </button>
//                 </div>
//             </div>

//             {/* Edit Modal */}
//             {showEditModal && editProduct && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//                     <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg">
//                         <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

//                         <input
//                             className="w-full border p-2 mb-3 rounded"
//                             placeholder="Name"
//                             value={editProduct.name}
//                             onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
//                         />

//                         <input
//                             className="w-full border p-2 mb-3 rounded"
//                             type="number"
//                             min="0"
//                             placeholder="Price"
//                             value={editProduct.price}
//                             onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
//                         />

//                         <input
//                             className="w-full border p-2 mb-3 rounded"
//                             type="number"
//                             min="0"
//                             placeholder="Stock"
//                             value={editProduct.stock}
//                             onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
//                         />

//                         <select
//                             className="w-full border p-2 mb-3 rounded"
//                             value={editProduct.category?.id || ""}
//                             onChange={(e) => {
//                                 const selectedCategory = categories.find(
//                                     (c) => c.id === Number(e.target.value)
//                                 );
//                                 setEditProduct({ ...editProduct, category: selectedCategory });
//                             }}
//                         >
//                             <option value="">Select Category</option>
//                             {categories.map((category) => (
//                                 <option key={category.id} value={category.id}>
//                                     {category.name}
//                                 </option>
//                             ))}
//                         </select>

//                         {editError && (
//                             <p className="text-red-500 text-sm mb-3">{editError}</p>
//                         )}

//                         <div className="flex justify-end gap-3 mt-4">
//                             <button
//                                 onClick={() => {
//                                     setShowEditModal(false);
//                                     setEditProduct(null);
//                                     setEditError("");
//                                 }}
//                                 className="px-4 py-2 bg-gray-200 rounded"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 onClick={async () => {
//                                     try {
//                                         await handleUpdateProduct(editProduct.id, {
//                                             name: editProduct.name,
//                                             price: editProduct.price,
//                                             stock: editProduct.stock,
//                                             category: editProduct.category?.id,
//                                         });
//                                         setShowEditModal(false);
//                                         setEditProduct(null);
//                                         setEditError("");
//                                     } catch (err) {
//                                         console.error(err);
//                                         setEditError("Update failed. Please try again.");
//                                     }
//                                 }}
//                                 className="px-4 py-2 bg-green-600 text-white rounded"
//                             >
//                                 Update
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Modal */}
//             {showDeleteModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-xl w-[300px] text-center shadow-lg">
//                         <h2 className="text-lg font-semibold mb-4">
//                             Are you sure you want to delete this product?
//                         </h2>

//                         {deleteError && (
//                             <p className="text-red-500 text-sm mb-3">{deleteError}</p>
//                         )}

//                         <div className="flex justify-center gap-3">
//                             <button
//                                 onClick={() => {
//                                     setShowDeleteModal(false);
//                                     setDeleteId(null);
//                                     setDeleteError("");
//                                 }}
//                                 className="px-4 py-2 bg-gray-200 rounded-lg"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 onClick={async () => {
//                                     try {
//                                         await handleDeleteProduct(deleteId);
//                                         setShowDeleteModal(false);
//                                         setDeleteId(null);
//                                         setDeleteError("");
//                                     } catch (err) {
//                                         console.error(err);
//                                         setDeleteError("Failed to delete. Please try again.");
//                                     }
//                                 }}
//                                 className="px-4 py-2 bg-red-600 text-white rounded-lg"
//                             >
//                                 OK
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Products;