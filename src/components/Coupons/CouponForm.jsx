import React, { useEffect, useState } from "react";

const CouponForm = ({ onClose, onSubmit, initialData, mode = "add" }) => {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        discount_type: "percentage",
        discount_value: "",
        valid_from: "",
        valid_to: "",
    });


    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                code: initialData.code || "",
                description: initialData.description || "",
                discount_type: initialData.discount_type || "percentage",
                discount_value: initialData.discount_value || "",
                valid_from: initialData.valid_from || "",
                valid_to: initialData.valid_to || "",
            });
        } else {
            setFormData({
                name: "",
                code: "",
                description: "",
                discount_type: "percentage",
                discount_value: "",
                valid_from: "",
                valid_to: "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData);
        onClose();
    };

    return (
        <div className="bg-white rounded-xl p-6 w-full">

            <h2 className="text-2xl font-bold mb-6">
                {mode === "edit" ? "Update Coupon" : "Add Coupon"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Coupon Name"
                    className="border p-2 rounded"
                />

                <input
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Coupon Code"
                    className="border p-2 rounded"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded md:col-span-2"
                />

                <select
                    name="discount_type"
                    value={formData.discount_type}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed</option>
                </select>

                <input
                    type="number"
                    name="discount_value"
                    value={formData.discount_value}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    placeholder="Value"
                />

                <input
                    type="date"
                    name="valid_from"
                    value={formData.valid_from}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    name="valid_to"
                    value={formData.valid_to}
                    onChange={handleChange}
                    className="border p-2 rounded" />

                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                    <button type="button" onClick={onClose}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button className="bg-[#FFA100] text-white px-4 py-2 rounded">
                        {mode === "edit" ? "Update" : "Save"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CouponForm;