// import { useState, useEffect } from "react";
// import {
//   FiX,
//   FiUploadCloud,
// } from "react-icons/fi";
// import { addProduct } from "../../api/products";

// function AddProductModal({ onClose, categories }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     price: "",
//     stock: "",
//     description: "",
//     status: "Active",
//   });
//   const [images, setImages] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     return () => images.forEach((img) => URL.revokeObjectURL(img.preview));
//   }, [images]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setImages((prev) => [...prev, ...previews]);
//   };

//   const removeImage = (index) => {
//     setImages((prev) => {
//       URL.revokeObjectURL(prev[index].preview);
//       return prev.filter((_, i) => i !== index);
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim())
//       newErrors.name = "Product name is required";

//     if (!formData.category)
//       newErrors.category = "Category is required";

//     if (!formData.price)
//       newErrors.price = "Price is required";

//     if (!formData.stock)
//       newErrors.stock = "Stock quantity is required";

//     if (!formData.description.trim())
//       newErrors.description = "Description is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setSubmitting(true);
//     try {
//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("category", formData.category);
//       data.append("price", formData.price);
//       data.append("stock", formData.stock);
//       data.append("description", formData.description);
//       data.append("status", formData.status);

//       images.forEach((img) => {
//         data.append("images", img.file);
//       });

//       await addProduct(data);
//       onSuccess();
//     } catch (error) {
//       console.error(error);
//       setErrors((prev) => ({
//         ...prev,
//         submit: "Failed to add product. Please try again.",
//       }));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
//           <h2 className="text-xl font-semibold">
//             Add Product
//           </h2>

//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-black"
//           >
//             <FiX size={24} />
//           </button>
//         </div>

//         {/* Scrollable Body */}
//         <form
//           id="add-product-form"
//           onSubmit={handleSubmit}
//           className="overflow-y-auto flex-1 p-6"
//         >
//           <div className="grid md:grid-cols-2 gap-6">

//             {/* Product Name */}
//             <div>
//               <label className="block mb-2 font-medium">
//                 Product Name
//               </label>

//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full border rounded-xl px-4 py-3"
//               />

//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.name}
//                 </p>
//               )}
//             </div>

//             {/* Category */}
//             <div>
//               <label className="block mb-2 font-medium">
//                 Category
//               </label>

//               <select
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full border rounded-xl px-4 py-3"
//               >
//                 <option value="">
//                   Select Category
//                 </option>

//                 {categories?.map((category) => (
//                   <option
//                     key={category.id}
//                     value={category.id}
//                   >
//                     {category.name}
//                   </option>
//                 ))}
//               </select>

//               {errors.category && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.category}
//                 </p>
//               )}
//             </div>

//             {/* Price */}
//             <div>
//               <label className="block mb-2 font-medium">
//                 Price
//               </label>

//               <input
//                 type="number"
//                 name="price"
//                 min="0"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="w-full border rounded-xl px-4 py-3"
//               />

//               {errors.price && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.price}
//                 </p>
//               )}
//             </div>

//             {/* Stock */}
//             <div>
//               <label className="block mb-2 font-medium">
//                 Stock Quantity
//               </label>

//               <input
//                 type="number"
//                 name="stock"
//                 min="0"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 className="w-full border rounded-xl px-4 py-3"
//               />

//               {errors.stock && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.stock}
//                 </p>
//               )}
//             </div>

//             {/* Status */}
//             <div>
//               <label className="block mb-2 font-medium">
//                 Status
//               </label>

//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full border rounded-xl px-4 py-3"
//               >
//                 <option>Active</option>
//                 <option>Inactive</option>
//               </select>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mt-6">
//             <label className="block mb-2 font-medium">
//               Description
//             </label>

//             <textarea
//               rows={5}
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border rounded-xl px-4 py-3"
//             />

//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.description}
//               </p>
//             )}
//           </div>

//           {/* Images */}
//           <div className="mt-6">
//             <label className="block mb-3 font-medium">
//               Product Images
//             </label>

//             <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer hover:border-[#FFA100]">
//               <FiUploadCloud
//                 size={40}
//                 className="text-gray-400 mb-3"
//               />

//               <span>
//                 Click to Upload Images
//               </span>

//               <input
//                 type="file"
//                 multiple
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </label>

//             {errors.images && (
//               <p className="text-red-500 text-sm mt-2">
//                 {errors.images}
//               </p>
//             )}

//             {images.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                 {images.map((img, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={img.preview}
//                       alt=""
//                       className="h-28 w-full object-cover rounded-xl border"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
//                     >
//                       <FiX size={14} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </form>

//         {/* Footer — outside scroll, always visible */}
//         <div className="flex flex-col items-end gap-2 px-6 py-4 border-t shrink-0">
//           {errors.submit && (
//             <p className="text-red-500 text-sm w-full text-right">
//               {errors.submit}
//             </p>
//           )}

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-3 border rounded-xl"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               form="add-product-form"
//               disabled={submitting}
//               className="bg-[#FFA100] px-5 py-3 rounded-xl font-medium disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {submitting ? "Saving..." : "Save Product"}
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default AddProductModal;