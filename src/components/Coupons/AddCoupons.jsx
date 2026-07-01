// import React, { useState } from "react";

// const AddCoupons = ({ onClose, addCoupon }) => {
//     const [formData, setFormData] = useState({
//         name: "",
//         code: "",
//         description: "",
//         discount_type: "percentage",
//         discount_value: "",
//         valid_from: "",
//         valid_to: "",
//         // status: "Active",
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         await addCoupon(formData);
//         onClose();
//     };

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold">Add Coupon</h2>
//                 {/*
//                 <button
//                     onClick={onClose}
//                     className="text-xl font-bold"
//                 >
//                     ✕
//                 </button> */}
//             </div>

//             <form
//                 onSubmit={handleSubmit}
//                 className="grid grid-cols-1 md:grid-cols-2 gap-5"
//             >
//                 <div>
//                     <label className="font-medium">Coupon Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg px-4 py-2 mt-1"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="font-medium">Coupon Code</label>
//                     <input
//                         type="text"
//                         name="code"
//                         value={formData.code}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg px-4 py-2 mt-1"
//                         required
//                     />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="font-medium">Description</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows="3"
//                         className="w-full border rounded-lg px-4 py-2 mt-1"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-medium">Discount Type</label>
//                     <select
//                         name="discount_type"
//                         value={formData.discount_type}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg px-4 py-2 mt-1">
//                         <option value="percentage">Percentage</option>
//                         <option value="cash">Fixed</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="font-medium">Discount Value</label>
//                     <input
//                         type="number"
//                         name="discount_value"
//                         value={formData.discount_value}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg px-4 py-2 mt-1"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="font-medium">Valid From</label>
//                     <input
//                         type="date"
//                         name="valid_from"
//                         value={formData.valid_from}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg px-4 py-2 mt-1"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="font-medium">Valid To</label>
//                     <input
//                         type="date"
//                         name="valid_to"
//                         value={formData.valid_to}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg px-4 py-2 mt-1"
//                         required
//                     />
//                 </div>

//                 {/* <div>
//                     <label className="font-medium">Status</label>
//                     <select
//                         name="status"
//                         value={formData.status}
//                         onChange={handleChange}
//                         className="w-full border rounded-lg px-4 py-2 mt-1"
//                     >
//                         <option>Active</option>
//                         <option>Inactive</option>
//                     </select>
//                 </div> */}

//                 <div className="md:col-span-2 flex justify-end gap-3 mt-4">
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         className="px-5 py-2 border rounded-lg"
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         type="submit"
//                         className="px-5 py-2 bg-[#FFA100] text-white rounded-lg"
//                     >
//                         Save Coupon
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddCoupons;