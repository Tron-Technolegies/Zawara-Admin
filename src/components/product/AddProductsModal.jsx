import { useState } from "react";
import { useCategories } from "../../hooks/useCategory";


function AddProductsModal({
    product,
    handleAddProduct,
    handleUpdateProduct,
    onClose,
}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const predefinedMaterials = [
        "Cotton",
        "Linen",
        "Polyester",
        "Silk",
    ];

    const [formData, setFormData] = useState({
        name: product?.name || "",
        category: product?.category?.id || "",
        size: product?.size || "",
        gender: product?.gender || "",
        price: product?.price || "",
        stock: product?.stock || "",
        description: product?.description || "",
        is_featured: product?.is_featured || false,
        sections: product?.sections || "none",

        material: product
            ? predefinedMaterials.includes(product.material)
                ? product.material
                : "Others"
            : "",
        customMaterial: product
            ? predefinedMaterials.includes(product.material)
                ? ""
                : product.material
            : "",
        image: null,
    });
    const { categories } = useCategories();
    const [showToast, setShowToast] = useState(false);


    const isEdit = !!product;

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };
    const confirmSubmit = async () => {
        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("category", formData.category);
            data.append("size", formData.size);
            data.append("gender", formData.gender);
            data.append("price", formData.price);
            data.append("stock", formData.stock);
            data.append("description", formData.description);
            data.append("is_featured", formData.is_featured);
            data.append("sections", formData.sections);
            data.append(
                "material",
                formData.material === "Others"
                    ? formData.customMaterial
                    : formData.material
            );

            if (formData.image) {
                data.append("image", formData.image);
            }

            if (isEdit) {
                await handleUpdateProduct(product.id, data);
            } else {
                await handleAddProduct(data);
            }

            setShowConfirm(false);
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
                onClose();
            }, 3000);

        } catch (error) {
            console.error(error);
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">
                {isEdit
                    ? "Update Product"
                    : "Add Product"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    placeholder="Name"
                    className="border p-3 rounded-lg" />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-3 rounded-lg">
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select
                    value={formData.size}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            size: e.target.value,
                        })
                    }
                    className="border p-3 rounded-lg">
                    <option value="">Select Size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="XL">Extra Large</option>
                </select>

                <input
                    value={formData.price}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            price: e.target.value,
                        })
                    }
                    placeholder="Price"
                    className="border p-3 rounded-lg" />

                <input
                    value={formData.stock}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            stock: e.target.value,
                        })
                    }
                    placeholder="Stock"
                    className="border p-3 rounded-lg" />

                <select
                    value={formData.gender}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            gender: e.target.value,
                        })
                    }
                    className="border p-3 rounded-lg">
                    <option value="">
                        Select Gender
                    </option>
                    <option value="Male">
                        Male
                    </option>
                    <option value="Female">
                        Female
                    </option>
                    <option value="Unisex">
                        Normal
                    </option>
                </select>

                <div></div>

                <textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description:
                                e.target.value,
                        })
                    }
                    placeholder="Description"
                    className="border p-3 rounded-lg md:col-span-2"
                    rows="4"
                />

                <div className="flex flex-col md:flex-row gap-4 md:col-span-2">
                    <select
                        name="sections"
                        value={formData.sections}
                        onChange={handleChange}
                        className="flex-1 border rounded-lg p-3"
                    >
                        <option value="none">None</option>

                        <optgroup label="Curated Edits">
                            <option value="curated Red Velvet">
                                Red Velvet
                            </option>
                            <option value="curated_chanderi_silks">
                                Chanderi Silks
                            </option>
                        </optgroup>

                        <option value="summer_chronicles">
                            Summer Chronicles
                        </option>

                        <option value="heritage_blooms">
                            Heritage Blooms
                        </option>
                    </select>

                    <div className="flex-1">
                        <select
                            value={formData.material}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    material: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">Select Material</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Linen">Linen</option>
                            <option value="Polyester">Polyester</option>
                            <option value="Silk">Silk</option>
                            <option value="Others">Others</option>
                        </select>

                        {formData.material === "Others" && (
                            <input
                                type="text"
                                name="customMaterial"
                                value={formData.customMaterial}
                                onChange={handleChange}
                                placeholder="Enter Material"
                                className="border p-3 rounded-lg mt-2 w-full"
                                required
                            />
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 md:col-span-2 p-2">
                    <input
                        type="checkbox"
                        id="is_featured"
                        checked={formData.is_featured}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                is_featured: e.target.checked,
                            })
                        } />
                    <label htmlFor="is_featured">
                        Featured Product
                    </label>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            image: e.target.files[0],
                        })
                    }
                    className="border p-3 rounded-lg md:col-span-2 w-full" />

                <div className="flex flex-col sm:flex-row gap-3 mt-4 md:col-span-2">
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-5 py-3 rounded-lg w-full sm:w-auto">
                        {isEdit
                            ? "Update Product"
                            : "Save Product"}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="border px-5 py-3 rounded-lg w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                </div>
                {showConfirm && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl w-[90%] max-w-md mx-4">
                            <h3 className="text-lg font-semibold">
                                {isEdit ? "Update Product" : "Add Product"}
                            </h3>

                            <p className="mt-2 text-gray-600">
                                {isEdit
                                    ? "Do you want to update this product?"
                                    : "Do you want to add this product?"}
                            </p>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={confirmSubmit}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showToast && (
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-[90%]">
                        {isEdit
                            ? "Product updated successfully"
                            : "Product added successfully"}
                    </div>
                )}
            </form>
        </div>
    );
}


export default AddProductsModal;