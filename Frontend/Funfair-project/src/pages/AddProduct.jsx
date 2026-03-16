import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Clothing",
    image: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message || "Product added successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "Clothing",
        image: "",
      });
    } catch (error) {
      console.error("Add product error:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Add Product</h1>
      <p className="text-gray-500 mb-6">Fill product details to add a new item.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;