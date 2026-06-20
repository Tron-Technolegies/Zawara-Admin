import { useState } from "react";
import {
  FiX,
  FiUploadCloud,
} from "react-icons/fi";

function AddCategoryModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    status: "Active",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData({
        ...formData,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-"),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Category name is required";
    }

    if (!image) {
      newErrors.image =
        "Category image is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log({
      ...formData,
      image,
    });

    onClose();
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

            {/* Slug */}
            <div>
              <label className="block mb-2 font-medium">
                Slug
              </label>

              <input
                type="text"
                value={formData.slug}
                readOnly
                className="w-full border bg-gray-100 rounded-xl px-4 py-3"
              />
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

        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal;