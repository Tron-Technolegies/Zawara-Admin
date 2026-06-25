import { useState } from "react";
import {
  FiX,
  FiUploadCloud,
} from "react-icons/fi";
import { useCategories } from "../../hooks/useCategory";

function AddCategoryModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });
  const { createCategory } = useCategories();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Category name is required";
    }

    // if (!image) {
    //   newErrors.image =
    //     "Category image is required";
    // }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowConfirmModal(true);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const saveCategory = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("status", formData.status);

      if (image) {
        data.append("image", image);
      }

      await createCategory(data);

      setShowConfirmModal(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Add category error:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            Add Category
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 max-h-[80vh] overflow-y-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">

            {/* Category Name */}
            <div>
              <label className="block mb-2 font-medium">
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className="w-full border rounded-xl px-4 py-3"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>


            {/* Status */}
            <div>
              <label className="block mb-2 font-medium">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter category description"
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <label className="block mb-3 font-medium">
              Category Image
            </label>

            <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center cursor-pointer hover:border-[#FFA100] transition">

              <FiUploadCloud
                size={42}
                className="text-gray-400 mb-3"
              />

              <span className="font-medium">
                Upload Category Image
              </span>

              <span className="text-sm text-gray-500">
                JPG, PNG, WEBP
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {errors.image && (
              <p className="text-red-500 text-sm mt-2">
                {errors.image}
              </p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-xl border mt-4"
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#FFA100] hover:bg-[#e69500] px-5 py-3 rounded-xl font-medium"
            >
              Save Category
            </button>

          </div>
          {showConfirmModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
              <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                <h3 className="text-lg font-semibold">
                  Add Category
                </h3>

                <p className="mt-2 text-gray-600">
                  Do you want to save this category?
                </p>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={saveCategory}
                    className="px-4 py-2 bg-[#FFA100] rounded-lg"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          {showSuccess && (
            <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-[70]">
              Category added successfully.
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal;