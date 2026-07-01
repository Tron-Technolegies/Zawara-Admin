import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import useCoupons from "../../hooks/useCoupons";
import { useState, useEffect } from "react";
import CouponForm from "./CouponForm";

const Coupons = () => {
    const { coupons, loading, addCoupon, editCoupon, removeCoupon } = useCoupons();
    const [showForm, setShowForm] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [actionType, setActionType] = useState("");
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [pendingFormData, setPendingFormData] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const triggerSuccess = () => {
        setSuccessMessage(
            actionType === "add"
                ? "Coupon added successfully"
                : actionType === "update"
                    ? "Coupon updated successfully"
                    : "Coupon deleted successfully"
        );

        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
    };
    // useEffect(() => {
    //     if (!showForm) {
    //         setSelectedCoupon(null);
    //     }
    // }, [showForm]);

    const handleConfirm = async () => {
        if (actionType === "add") {
            await addCoupon(pendingFormData);
        }

        if (actionType === "update") {
            await editCoupon(selectedCoupon.id, pendingFormData);
        }

        if (actionType === "delete") {
            await removeCoupon(selectedCoupon.id);
        }

        setShowConfirmModal(false);
        setShowForm(false);
        setSelectedCoupon(null);
        setPendingFormData(null);
        triggerSuccess();
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <h1 className="text-2xl font-bold">Coupons</h1>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                    <select className="border rounded-lg px-4 py-2">
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search coupon..."
                        className="border rounded-lg px-4 py-2 sm:w-64"
                    />

                    <button onClick={() => {
                        setSelectedCoupon(null);
                        setShowForm(true);
                    }}
                        className="bg-orange-400 px-4 py-2 rounded-lg font-semibold">
                        Add Coupon
                    </button>
                </div>
            </div>

            {/* Coupon Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                    <div
                        key={coupon.id}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition"
                    >
                        {/* Name & Code */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">
                                {coupon.name}
                            </h3>

                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-semibold">
                                {coupon.code}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mt-4">
                            <p className="text-gray-600">
                                {coupon.description}
                            </p>
                        </div>

                        {/* Discount */}
                        <div className="mt-5 flex justify-between">
                            <p className="font-semibold">
                                {coupon.discount_type}
                            </p>

                            <p className="font-semibold">
                                {coupon.discount_value}
                            </p>
                        </div>

                        {/* Dates */}
                        <div className="mt-5 flex justify-between">
                            <p className="font-semibold">
                                {coupon.valid_from}
                            </p>

                            <p className="font-semibold">
                                {coupon.valid_to}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={() => {
                                setSelectedCoupon(coupon);
                                setShowForm(true);
                                setActionType("update");
                                // setShowConfirmModal(true);
                            }}
                                className="w-9 h-9 md:w-11 md:h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                <Pencil size={18} />
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedCoupon(coupon);
                                    setActionType("delete");
                                    setShowConfirmModal(true);
                                }}

                                className="w-9 h-9 md:w-11 md:h-11 bg-red-50 rounded-xl flex items-center justify-center text-red-600 text-sm">

                                <Trash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {
                showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

                        <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative">

                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-3 right-3"
                            >
                                ✕
                            </button>

                            <CouponForm
                                mode={selectedCoupon ? "edit" : "add"}
                                initialData={selectedCoupon}
                                onClose={() => setShowForm(false)}
                                onSubmit={(data) => {
                                    setPendingFormData(data);
                                    setActionType(selectedCoupon ? "update" : "add");
                                    setShowForm(false);
                                    setShowConfirmModal(true);
                                }}
                            />

                        </div>
                    </div>
                )
            }
            {
                showConfirmModal && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
                        <div className="bg-white p-5 sm:p-6 rounded-xl w-[90%] max-w-sm shadow-lg">

                            <h3 className="text-lg font-semibold">
                                {actionType === "add" && "Add Coupon"}
                                {actionType === "update" && "Update Coupon"}
                                {actionType === "delete" && "Delete Coupon"}
                            </h3>

                            <p className="mt-2 text-gray-600">
                                {actionType === "add" && "Do you want to add this coupon?"}
                                {actionType === "update" && "Do you want to update this coupon?"}
                                {actionType === "delete" && "Do you want to delete this coupon?"}
                            </p>

                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        setShowConfirmModal(false);

                                        if (actionType !== "delete") {
                                            setShowForm(true);
                                        }
                                    }}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleConfirm}
                                    className={`px-4 py-2 rounded-lg text-white ${actionType === "delete"
                                        ? "bg-red-500"
                                        : "bg-[#FFA100]"
                                        }`}
                                >
                                    Confirm
                                </button>
                            </div>

                        </div>
                    </div>
                )
            }

            {
                showSuccess && (
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-[70]">
                        {actionType === "add" && "Coupon added successfully"}
                        {actionType === "update" && "Coupon updated successfully"}
                        {actionType === "delete" && "Coupon deleted successfully"}
                    </div>
                )
            }
        </div >
    );
};

export default Coupons;