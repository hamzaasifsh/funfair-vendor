import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/my-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>

      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-4 shadow bg-white">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2">Price: ₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Category: {product.category}</p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;