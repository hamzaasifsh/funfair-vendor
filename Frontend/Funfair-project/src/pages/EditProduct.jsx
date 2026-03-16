import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Clothing",
    image: "",
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/my-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const product = Array.isArray(data)
          ? data.find((item) => item._id === id)
          : null;

        if (product) {
          setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
            category: product.category || "Clothing",
            image: product.images?.[0] || "",
          });
        }
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    loadProduct();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message || "Product updated successfully");
      navigate("/my-products");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
      <p className="text-gray-500 mb-6">Update your product details.</p>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 h-32"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="Clothing">Clothing</option>
          <option value="Beauty">Beauty</option>
          <option value="Food">Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;