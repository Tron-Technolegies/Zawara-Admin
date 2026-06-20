import { useState } from "react";
import {
  FiX,
  FiUploadCloud,
} from "react-icons/fi";

function AddProductModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    status: "Active",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(previews);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Product name is required";

    if (!formData.category)
      newErrors.category = "Category is required";

    if (!formData.price)
      newErrors.price = "Price is required";

    if (!formData.stock)
      newErrors.stock = "Stock quantity is required";

    if (!formData.description.trim())
      newErrors.description =
        "Description is required";

    if (images.length === 0)
      newErrors.images =
        "At least one image is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(formData);
    console.log(images);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center  justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            Add Product
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[75vh] p-6"
        >
          <div className="grid md:grid-cols-2 gap-6">

            {/* Product Name */}
            <div>
              <label className="block mb-2 font-medium">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">
                  Select Category
                </option>
                <option>Lehenga</option>
                <option>Saree</option>
                <option>Kurti</option>
                <option>Gown</option>
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 font-medium">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 font-medium">
                Stock Quantity
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock}
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
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Images */}
          <div className="mt-6">
            <label className="block mb-3 font-medium">
              Product Images
            </label>

            <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center cursor-pointer hover:border-[#FFA100]">
              <FiUploadCloud
                size={40}
                className="text-gray-400 mb-3"
              />

              <span>
                Click to Upload Images
              </span>

              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {errors.images && (
              <p className="text-red-500 text-sm mt-2">
                {errors.images}
              </p>
            )}

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img.preview}
                    alt=""
                    className="h-28 w-full object-cover rounded-xl border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#FFA100] px-5 py-3 rounded-xl font-medium"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;